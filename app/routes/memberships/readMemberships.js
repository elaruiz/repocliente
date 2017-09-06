'use strict';
import { findUserMemberships } from "../../controllers/MembershipController";

// const membershipController = require('../../controllers/index').memberships;

export default {
    method: 'GET',
    path: '/api/user/{id}/memberships',
    config: {
        auth: false,
        handler: findUserMemberships,
    }
};
