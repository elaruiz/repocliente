'use strict';

const Joi = require('joi');

module.exports = {

    createUserSchema:
        Joi.object({
            name: Joi.string().alphanum().min(2).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }),

    checkUserSchema:
        Joi.object({
            email: Joi.string()
        }),

    authenticateUserSchema:
        Joi.alternatives().try(
            Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required()
            })),
    payloadSchema: Joi.object({
        name: Joi.string().alphanum().min(2).max(30),
        email: Joi.string().email()
    }),
    paramsSchema: Joi.object({
    id: Joi.number().integer().required()
    })

};
