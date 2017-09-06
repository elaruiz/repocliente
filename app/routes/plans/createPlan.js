'use strict';

import { createPlanSchema } from "../../schemas/PlanSchema";
import { createPlan } from "../../controllers/PlanController";

// const createPlanSchema = require('../../schemas/PlanSchema').createPlanSchema;
// const plansController = require('../../controllers/index').plans;


module.exports = {
    method: 'POST',
    path: '/api/plans',
    config: {
        auth: {
            strategy: 'jwt',
            scope: ['admin']
        },
        handler: createPlan,
        // Validate the payload against the Joi schema
        validate: {
            payload: createPlanSchema
        }
    }
};
