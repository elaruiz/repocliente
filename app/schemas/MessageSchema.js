const Joi = require('joi');

// module.exports = {
export const MessageSchema = Joi.object({
    sender: Joi.string().required(),
    phone: Joi.string(),
    email: Joi.string().email(),
    subject: Joi.string().required(),
    content: Joi.string().required()
});
// };