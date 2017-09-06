'use strict';
import { createMembership, findPlan } from "../../controllers/MembershipController";

// const membershipController = require('../../controllers/index').memberships;

export default {
    method: 'POST',
    path: '/api/memberships',
    config: {
        pre: [{ method: findPlan, assign: 'plan' }],
        auth: false,
        handler: createMembership,
    }
};
