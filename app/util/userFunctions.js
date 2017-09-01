'use strict';

const bcrypt = require('bcryptjs');

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

module.exports = {
    hashPassword: hashPassword,
    comparePasswords: comparePasswords
};