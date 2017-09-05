'use strict';

const plansController = require('../../controllers/index').plans;

module.exports = {
    method: 'GET',
    path: '/api/plan/{id}',
    config: {
        auth: {
            strategy: 'jwt'
        },
        handler: plansController.findPlan,
    }
};
