'use strict'

const Boom = require('boom');
const Membership = require('../models').membership;
const Plan = require('../models').plan;
const User = require('../models').user;
module.exports = {

    createMembership(req, res) {
        Membership
            .create(req.payload, req.pre.plan.term)
            .then(membership => res({data: membership}).code(201))
            .catch(error => res(Boom.badRequest(error)));

    },

    findPlan(req, res) {
        return Plan
            .findById(req.payload.plan_id)
            .then(plan => {
                if (!plan) {
                    return res(Boom.notFound('Not Found'));
                }
                return res(plan).code(200);
            })
            .catch((error) => res(Boom.badRequest(error)));
    },

    findUserMemberships(req, res) {
        return User.findOne({
            where: {id : req.params.id},
            include: [
                {
                    model:Plan

                }
            ]
        }).then(users => res({data: users}))
    }
};