'use strict';

import { verifyCredentials } from "../../controllers/UserController";
import createToken from "../../util/token";
import { authenticateUserSchema } from "../../schemas/UserSchema";

// const authenticateUserSchema = require('../../schemas/UserSchema').authenticateUserSchema;
// const usersController = require('../../controllers/index').users;
// const createToken = require('../../util/token');

export default {
    method: 'POST',
    path: '/api/users/login',
    config: {
        auth: false,
        // Check the user's password against the DB
        pre: [{ method: verifyCredentials, assign: 'user' }],
        handler: (req, res) => {
            // If the user's password is correct, we can issue a token.
            // If it was incorrect, the error will bubble up from the pre method
            res({ token: createToken(req.pre.user), data: req.pre.user }).code(200);
        },
        validate: {
            payload: authenticateUserSchema
        }
    }
};
