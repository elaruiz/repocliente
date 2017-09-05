'use strict';

const plansController = require('../../controllers/index').plans;

module.exports = {
    method: 'DELETE',
    path: '/api/plans/{id}',
    config: {
        auth: {
            strategy: 'jwt',
            scope: ['admin']
        },
        handler: plansController.deletePlan,
    }
};
