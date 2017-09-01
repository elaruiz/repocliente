'use strict';

const usersController = require('../../controllers/index').users;

module.exports = {
    method: 'GET',
    path: '/api/users/me',
    config: {
        auth: 'jwt',
        handler: usersController.findUser
    }
};