'use strict';
import { deletePlan } from "../../controllers/PlanController";

// const plansController = require('../../controllers/index').plans;

export default {
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
