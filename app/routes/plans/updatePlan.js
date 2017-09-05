'use strict';

const createPlanSchema = require('../../schemas/PlanSchema').createPlanSchema;
const plansController = require('../../controllers/index').plans;

module.exports = {
    method: 'PUT',
    path: '/api/plans/{id}',
    config: {
        auth: {
            strategy: 'jwt',
            scope: ['admin']
        },
        handler: plansController.updatePlan,
        // Validate the payload against the Joi schema
        validate: {
            payload: createPlanSchema
        }
    }
};
