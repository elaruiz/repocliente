'use strict';

const Joi = require('joi');

// module.exports = {

export const createUserSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const checkUserSchema = Joi.object({
    email: Joi.string()
});

export const authenticateUserSchema = Joi.alternatives().try(
    Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
);

export const payloadSchema = Joi.object({
    name: Joi.string().alphanum().min(2).max(30),
    email: Joi.string().email()
});

export const paramsSchema = Joi.object({
    id: Joi.number().integer().required()
});

// };
