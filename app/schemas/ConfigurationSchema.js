'use strict';

const Joi = require('joi');

const required = 'Este campo es requerido';
const empty = 'Este campo no puede ser vacío';

export const createOrEditConfSchema = Joi.object({
    name: Joi.string().trim().required().options({
        language: {
            any: { required, empty }
        }
    }),
    type: Joi.any().valid(['string', 'number']),
    value: Joi.alternatives()
        .when(Joi.ref('type'), {is: 'string',then: Joi.string().trim().required().options({
            language: {
                any: { required, empty}
            }
        })})
        .when(Joi.ref('type'), {is: 'number',then: Joi.number().required().options({
            language: {
                any: { required, empty},
                number: {
                    base: 'Este campo debe tener un valor numérico'
                }
            }
        })})
});