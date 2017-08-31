'use strict'

const Boom = require('boom');
const User = require('../models').User;
const func = require('../util/userFunctions');
const createToken = require('../util/token');

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

    verifyCredentials(req, res) {
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
                    return res(user);
                })

               // (func.comparePasswords(password, user.password)) ? res(user) : res(Boom.badRequest('Incorrect username or email!'));
            });
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
                 admin: true
             })
                 .then(user => res({ token: createToken(user) }).code(201))
                 .catch(error => Boom.badRequest(error));
        });
    }

};