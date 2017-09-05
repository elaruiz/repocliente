const Joi = require('joi');

module.exports = {
    createPlanSchema:
        Joi.object({
            payment_method: Joi.string().required(),
            user_id: Joi.number().integer().required(),
            plan_id: Joi.number().integer().required(),
        })
};