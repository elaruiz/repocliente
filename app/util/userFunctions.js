'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../constants');
const moment = require('moment');
const Boom = require('boom');

function hashPassword(password, cb) {
    // Generate a salt at level 10 strength
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            return cb(err, hash);
        });
    });
}
function comparePasswords(password, userPassword, cb) {
    // Generate a salt at level 10 strength
    bcrypt.compare(password, userPassword, (err, isValid) => {
        return cb(err, isValid);
    });
}
function ensureAuthenticated(req, res, next) {
    let token = req.headers.authorization.split(' ')[1];
    let payload = null;
    try {
        payload = jwt.decode(token, secret);
    }
    catch (err) {
        return res(Boom.unauthorized('Unauthorized'));
    }
    if (payload.exp <= moment().unix()) {
        return res(Boom.badRequest('Token expired'));
    }
    console.log(payload)
    req.payload.id = payload.sub;
    next();
}
module.exports = {
    hashPassword: hashPassword,
    comparePasswords: comparePasswords,
    ensureAuthenticated: ensureAuthenticated
};