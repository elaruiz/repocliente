const Joi = require('joi');

export const createPlanSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    reports: Joi.number().integer().min(1).max(100).required(),
    price: Joi.number().required(),
    currency: Joi.string().min(1).max(3).required(),
    interval_time: Joi.string().valid('month', 'year', 'week', 'day').required(),
    interval_count: Joi.number().integer().min(1).required(),
});

export const updatePlanSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    reports: Joi.number().integer().min(1).max(100),
    price: Joi.number(),
    currency: Joi.string().min(1).max(3),
    interval_time: Joi.string().valid('month', 'year', 'week', 'day'),
    interval_count: Joi.number().integer().min(1),
});