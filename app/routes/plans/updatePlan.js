'use strict';
import { updatePlan } from "../../controllers/PlanController";
import { createPlanSchema } from "../../schemas/PlanSchema";

// const createPlanSchema = require('../../schemas/PlanSchema').createPlanSchema;
// const plansController = require('../../controllers/index').plans;

export default {
    method: 'PUT',
    path: '/api/plans/{id}',
    config: {
        auth: {
            strategy: 'jwt',
            scope: ['admin']
        },
        handler: updatePlan,
        // Validate the payload against the Joi schema
        validate: {
            payload: createPlanSchema
        }
    }
};
