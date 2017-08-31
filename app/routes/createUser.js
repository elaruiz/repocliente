'use strict';

const createUserSchema = require('../schemas/createUser');
const usersController = require('../controllers').users;

module.exports = {
  method: 'POST',
  path: '/api/users',
  config: {
    auth: false,
    // Before the route handler runs, verify that the user is unique
    pre: [{ method: usersController.verifyUniqueUser }],
    handler: usersController.createUser,
    // Validate the payload against the Joi schema
    validate: {
      payload: createUserSchema
    }
  }
};
