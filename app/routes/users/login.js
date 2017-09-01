'use strict';

const authenticateUserSchema = require('../../schemas/user').authenticateUserSchema;
const usersController = require('../../controllers/index').users;
const createToken = require('../../util/token');

module.exports = {
    method: 'POST',
    path: '/api/users/login',
    config: {
        auth: false,
        // Check the user's password against the DB
        pre: [{ method: usersController.verifyCredentials, assign: 'user' }],
        handler: (req, res) => {
            // If the user's password is correct, we can issue a token.
            // If it was incorrect, the error will bubble up from the pre method
            res({ token: createToken(req.pre.user), data: req.pre.user }).code(201);
        },
        validate: {
            payload: authenticateUserSchema
        }
    }
};
