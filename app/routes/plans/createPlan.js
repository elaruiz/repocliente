'use strict';

const createPlanSchema = require('../../schemas/PlanSchema').createPlanSchema;
const plansController = require('../../controllers/index').plans;

//import { createPlan } from '../../controllers/PlansController'

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
