'use strict';

const usersController = require('../../controllers/index').users;

module.exports = {
    method: 'GET',
    path: '/api/users/logout',
    config: {
        auth: 'jwt',
        handler: usersController.setLastLogin
    }
};