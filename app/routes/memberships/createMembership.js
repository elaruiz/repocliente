'use strict';

const membershipController = require('../../controllers/index').memberships;

module.exports = {
    method: 'POST',
    path: '/api/memberships',
    config: {
        pre: [{ method: membershipController.findPlan, assign: 'plan' }],
        auth: false,
        handler: membershipController.createMembership,
    }
};
