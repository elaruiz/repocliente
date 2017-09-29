const Joi = require('joi');

// module.exports = {
export const membershipSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    plan_id: Joi.number().integer().required(),
})
// };