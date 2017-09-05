'use strict';

const membershipController = require('../../controllers/index').memberships;

module.exports = {
    method: 'GET',
    path: '/api/user/{id}/memberships',
    config: {
        auth: false,
        handler: membershipController.findUserMemberships,
    }
};
