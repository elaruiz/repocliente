'use strict';

const createPlanSchema = require('../../schemas/plan').createPlanSchema;
const plansController = require('../../controllers/index').plans;

module.exports = {
    method: 'POST',
    path: '/api/plans',
    config: {
        auth: {
            strategy: 'jwt',
            scope: ['admin']
        },
        handler: plansController.createPlan,
        // Validate the payload against the Joi schema
        validate: {
            payload: createPlanSchema
        }
    }
};
