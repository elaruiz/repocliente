'use strict';

import { createUser, verifyUniqueUser } from "../../controllers/UserController";
import { createUserSchema } from "../../schemas/UserSchema";

// const createUserSchema = require('../../schemas/UserSchema').createUserSchema;
// const usersController = require('../../controllers/index').users;

export default {
    method: 'POST',
    path: '/api/users',
    config: {
        auth: false,
        // Before the route handler runs, verify that the user is unique
        pre: [{ method: verifyUniqueUser }],
        handler: createUser,
        // Validate the payload against the Joi schema
        validate: {
            payload: createUserSchema
        }
    }
};
