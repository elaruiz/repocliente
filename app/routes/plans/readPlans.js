'use strict';
import { findAllPlans } from "../../controllers/PlanController";

// const plansController = require('../../controllers/index').plans;

export default {
    method: 'GET',
    path: '/api/plans',
    config: {
        auth: false,
        handler: findAllPlans,
    }
};
