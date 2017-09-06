'use strict';

import Boom from 'boom';
// const Plan = require('../models').plan;
import Models from '../models';
const Plan = Models.plan;

export const findPlan = (req, res) => {
    return Plan
        .findById(req.params.id)
        .then(plan => {
            if (!plan) {
                return res(Boom.notFound('Not Found'));
            }
            return res({data: plan}).code(200);
        })
        .catch((error) => res(Boom.badRequest(error)));
};

export const findAllPlans = (req, res) => {
    return Plan
        .findAll({offset: req.query.page, limit: req.query.size || 20})
        .then(plans => {
            if (!plans) {
                return res(Boom.notFound('Not Found'));
            }
            return res({data: plans}).code(200);
        })
        .catch((error) => res(Boom.badRequest(error)));
};

export const createPlan = (req, res) => {
    Plan
        .create(req.payload)
        .then(plan => res({data: plan}).code(201))
        .catch(error => Boom.badRequest(error));

};

export const updatePlan = (req, res) => {
    return plan
        .update({
            name: req.payload.name || plan.name,
            description: req.payload.description || plan.description,
            reports: req.payload.reports || plan.reports,
            price: req.payload.price || plan.price,
            currency: req.payload.currency || plan.currency,
            term: req.payload.term || plan.term
        })
        .then(plan => res({data: plan}).code(200))
        .catch(error => res(Boom.badRequest(error)))
};

export const deletePlan = (req, res) => {
    return plan
        .destroy()
        .then(success => res().code(204))
        .catch(error => res(Boom.badRequest(error)));
};

/*
module.exports = {
    findPlan, createPlan, deletePlan, findAllPlans, updatePlan
}*/
