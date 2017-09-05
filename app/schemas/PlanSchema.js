const Joi = require('joi');

module.exports = {
    createPlanSchema:
        Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            reports: Joi.number().integer().min(1).max(100).required(),
            price: Joi.number().required(),
            currency: Joi.string().min(1).max(3).required(),
            term: Joi.number().integer().min(1).max(365).required()
        })
};