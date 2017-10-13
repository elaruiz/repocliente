const Joi = require('joi');

// module.exports = {
export const MessageSchema = Joi.object({
    sender: Joi.string().required().options({
        language: {
          any: {
            required: 'Este campo es requerido',
            empty: 'Este campo no puede ser vacío'
          }
        }
      }),
    phone: Joi.string(),
    email: Joi.string().email(),
    subject: Joi.string().required().options({
        language: {
          any: {
            required: 'Este campo es requerido',
            empty: 'Este campo no puede ser vacío'
          }
        }
      }),
    content: Joi.string().required().options({
        language: {
          any: {
            required: 'Este campo es requerido',
            empty: 'Este campo no puede ser vacío'
          },
        }
      })
});
// };