'use strict'

const Boom = require('boom');
const Plan = require('../models').Plan;

module.exports = {

    createPlan(req, res) {
        Plan.create({
            name: req.payload.name,
            description: req.payload.description,
            reports: req.payload.reports,
            price: req.payload.price,
            currency: req.payload.currency,
            term: req.payload.term
        })
            .then(plan => res({ data: plan }).code(201))
            .catch(error => Boom.badRequest(error));

    },

};