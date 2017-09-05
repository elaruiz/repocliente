'use strict'

const Boom = require('boom');
const User = require('../models').user;
const func = require('../util/userFunctions');
const createToken = require('../util/token');
const moment = require('moment');

module.exports = {

    verifyUniqueUser(req, res) {
        return User
            .findOne({
                where: {
                    email: req.payload.email.toLowerCase()
                }
            })
            .then(user => {
                    if(user) {
                        return res(Boom.badRequest('Email taken'));
                    }
                // If everything checks out, send the payload through
                // to the route handler
                res(req.payload);
            });
    },

    verifyCredentials: function (req, res) {
        const password = req.payload.password;
        return User
            .findOne({
                where: {
                    email: req.payload.email.toLowerCase()
                }
            })
            .then(user => {
                if (!user) {
                    return res(Boom.badRequest('Incorrect email!'));
                }
                func.comparePasswords(password, user.password, (err, suc) => {
                    if (err) {
                        throw Boom.badRequest(err);
                    }
                    (suc) ? res(user) : res(Boom.badRequest('Incorrect password!'))
                })
            });
    },

    verifyUser (req, res) {
        return req.params.id !== req.auth.credentials.id ? res(Boom.notFound('Not Found')) : User
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(user => {
                if (!user) {
                    return res(Boom.notFound('Not Found'));
                }
                return res(user);

            }).catch(err => res(Boom.badRequest(err)));
    },

    createUser(req, res) {
         func.hashPassword(req.payload.password, (err, hash) => {
            if (err) {
                throw Boom.badRequest(err);
            }
             User.create({
                 name: req.payload.name,
                 email: req.payload.email.toLowerCase(),
                 password: hash,
             })
                 .then(user => res({ token: createToken(user), data: user }).code(201))
                 .catch(error => Boom.badRequest(error));
        });
    },

    findUser(req, res) {
        return User
            .findOne({
                where: {
                    id: req.auth.credentials.id
                },
                attributes: {
                    exclude: ['password', 'created_at', 'updated_at', 'deleted_at', 'admin']
                }
            })
            .then(user => {
                if (!user) {
                    return res(Boom.notFound('Not Found'));
                }
                return res({data: user}).code(200);

            })
            .catch((error) => res(Boom.badRequest(error)));
    },

    updateUser(req, res) {
        let user = req.pre.user;
        return user
            .update({
                name: req.payload.name || user.name,
                email: req.payload.email || user.email,
                admin: req.payload.admin || user.admin,
            })
            .then((user) => res({data: user}).code(200))
            .catch((error) => res(Boom.badRequest(error)))

    },

    deleteUser(req, res) {
        let user = req.pre.user;
        return user.destroy()
                    .then(success => res().code(204))
                    .catch(error => res(Boom.badRequest(error)))
    },

    setLastLogin(req, res) {
        return User
            .findOne({
                where: {
                    id: req.auth.credentials.id
                }
            })
            .then(user => {
                user
                    .update()
                    .then(() => res({data: user}).code(200))
                    .catch((error) => Boom.badRequest(error))
            });
    },

};