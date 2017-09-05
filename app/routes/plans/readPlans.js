'use strict';

const plansController = require('../../controllers/index').plans;

module.exports = {
    method: 'GET',
    path: '/api/plans',
    config: {
        auth: false,
        handler: plansController.findAllPlans,
    }
};
