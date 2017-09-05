'use strict';
const paramsUserSchema = require('../../schemas/UserSchema').paramsSchema;
const usersController = require('../../controllers/index').users;

module.exports = {
    method: 'DELETE',
    path: '/api/users/{id}',
    config: {
        pre: [{ method: usersController.verifyUser, assign: 'user' }],
        handler: usersController.deleteUser,
        validate: {
            params: paramsUserSchema
        },
        auth: {
            strategy: 'jwt'
        }
    }
};