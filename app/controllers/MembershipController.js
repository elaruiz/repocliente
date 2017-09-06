'use strict'

import Boom from 'boom';
// const Membership = require('../models').membership;
// const Plan = require('../models').plan;
// const User = require('../models').user;

import Models from '../models';

const Message = Models.message;
const User = Models.user;
const Plan = Models.plan;

// module.exports = {

export const createMembership = (req, res) => {
    Membership
        .create(req.payload, req.pre.plan.term)
        .then(membership => res({ data: membership }).code(201))
        .catch(error => res(Boom.badRequest(error)));

};

export const findPlan = (req, res) => {
    return Plan
        .findById(req.payload.plan_id)
        .then(plan => {
            if (!plan) {
                return res(Boom.notFound('Not Found'));
            }
            return res(plan).code(200);
        })
        .catch((error) => res(Boom.badRequest(error)));
};

export const findUserMemberships = (req, res) => {
    return User.findOne({
        where: { id: req.params.id },
        include: [
            {
                model: Plan

            }
        ]
    }).then(users => res({ data: users }))
};
// };