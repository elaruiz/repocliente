'use strict';
import { updateUser, verifyUser } from "../../controllers/UserController";
import { paramsSchema, payloadSchema } from "../../schemas/UserSchema";

// const updateUserSchema = require('../../schemas/UserSchema');
// const usersController = require('../../controllers/index').users;

export default {
    method: 'PATCH',
    path: '/api/users/{id}',
    config: {
        pre: [{ method: verifyUser, assign: 'user' }],
        handler: updateUser,
        validate: {
            payload: payloadSchema,
            params: paramsSchema
        },
        auth: {
            strategy: 'jwt'
        }
    }
};