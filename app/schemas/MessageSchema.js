const Joi = require('joi');

// module.exports = {
export const MessageSchema = Joi.object({
    sender: Joi.string().required().error(new Error('Este campo es necesario')),
    phone: Joi.string(),
    email: Joi.string().email(),
    subject: Joi.string().required().error(new Error('Este campo es necesario')),
    content: Joi.string().required().error(new Error('Este campo es necesario'))
});
// };