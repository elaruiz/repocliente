'use strict';

const checkUserSchema = require('../schemas/checkUser');
const usersController = require('../controllers').users;
const func = require('../util/userFunctions');

module.exports = {
  method: 'GET',
  path: '/api/users/me',
  config: {
    auth: false,
    pre: [{ method: func.ensureAuthenticated}],
    handler: (req, res) => {
      res('Ok');
    },
    // Validate the payload against the Joi schema
    validate: {
      payload: checkUserSchema
    }
  }
};
