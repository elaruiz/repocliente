'use strict';

const updateUserSchema = require('../../schemas/user');
const usersController = require('../../controllers/index').users;

module.exports = {
    method: 'PATCH',
    path: '/api/users/{id}',
    config: {
        pre: [{ method: usersController.verifyUser, assign: 'user' }],
        handler: usersController.updateUser,
        validate: {
            payload: updateUserSchema.payloadSchema,
            params: updateUserSchema.paramsSchema
        },
        auth: {
            strategy: 'jwt'
        }
    }
};