
import {createPlan, deletePlan, findAllPlans, findPlan, updatePlan} from "../controllers/PlanController";
import {createPlanSchema, updatePlanSchema} from "../schemas/PlanSchema";


const createPlanRoute = {
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

const deletePlanRoute = {
    method: 'DELETE',
    path: '/api/plans/{id}',
    config: {
        auth: {
            strategy: 'jwt',
            scope: ['admin']
        },
        handler: deletePlan,
    }
};

const readPlanRoute = {
    method: 'GET',
    path: '/api/plan/{id}',
    config: {
        auth: false,
        handler: findPlan,
    }
};

const readPlansRoute = {
    method: 'GET',
    path: '/api/plans',
    config: {
        auth: false,
        handler: findAllPlans,
    }
};

const updatePlanRoute = {
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
            payload: updatePlanSchema
        }
    }
};

export default [
    createPlanRoute,
    readPlansRoute,
    readPlanRoute,
    updatePlanRoute,
    deletePlanRoute
];