'use strict';
import { findPlan } from "../../controllers/PlanController";

// const plansController = require('../../controllers/index').plans;

export default {
    method: 'GET',
    path: '/api/plan/{id}',
    config: {
        auth: {
            strategy: 'jwt'
        },
        handler: findPlan,
    }
};
