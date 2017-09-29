
import {deleteMembership, findUserMembership, findUserMemberships} from "../controllers/MembershipController";
import {findPlan} from "../controllers/PlanController";
import {paymentPaypal, paymentStripe} from "../controllers/TransactionController";

const cancelMembershipRoute = {
    method: 'DELETE',
    path: '/api/membership/{id}',
    config: {
        auth: {
            strategy: 'jwt'
        },
        handler: deleteMembership,
    }
};

const paypalMembershipRoute = {
    method: 'POST',
    path: '/api/plan/{id}/membership-paypal',
    config: {
        pre: [{ method: findPlan, assign: 'plan' }],
        auth: 'jwt',
        handler: paymentPaypal
    }
};

const stripeMembershipRoute = {
    method: 'POST',
    path: '/api/plan/{id}/membership-stripe',
    config: {
        pre: [{ method: findPlan, assign: 'plan' }],
        auth: {
            strategy: 'jwt'
        },
        handler: paymentStripe
    }
};

const readMembershipRoute = {
    method: 'GET',
    path: '/api/membership/{membership}',
    config: {
        auth: {
            strategy: 'jwt'
        },
        handler: findUserMembership,
    }
};

const readMembershipsRoute = {
    method: 'GET',
    path: '/api/memberships',
    config: {
        auth: {
            strategy: 'jwt'
        },
        handler: findUserMemberships,
    }
};

export default [
    cancelMembershipRoute,
    readMembershipRoute,
    readMembershipsRoute,
    stripeMembershipRoute,
    paypalMembershipRoute];