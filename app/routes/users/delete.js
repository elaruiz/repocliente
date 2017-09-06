'use strict';
import { deleteUser, verifyUser } from "../../controllers/UserController";
import { paramsSchema } from "../../schemas/UserSchema";
// const paramsUserSchema = require('../../schemas/UserSchema').paramsSchema;
// const usersController = require('../../controllers/index').users;

module.exports = {
    method: 'DELETE',
    path: '/api/users/{id}',
    config: {
        pre: [{ method: verifyUser, assign: 'user' }],
        handler: deleteUser,
        validate: {
            params: paramsSchema
        },
        auth: {
            strategy: 'jwt'
        }
    }
};