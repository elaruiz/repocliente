'use strict';

const messageSchema = require('../../schemas/MessageSchema').messageSchema;
const msgController = require('../../controllers/index').messages;

module.exports = {
  method: 'POST',
  path: '/api/messages',
  config: {
    auth: false,
    handler: msgController.createMessage,
    // Validate the payload against the Joi schema
    validate: {
      payload: messageSchema
    }
  }
};
