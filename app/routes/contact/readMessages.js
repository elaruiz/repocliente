'use strict';

const msgController = require('../../controllers/index').messages;

module.exports = {
  method: 'GET',
  path: '/api/messages',
  config: {
    auth: {
            strategy: 'jwt',
            scope: ['admin']
        },
    handler: msgController.findAllMessages,
  }
};
