'use strict';

const msgController = require('../../controllers/index').messages;

module.exports = {
  method: 'DELETE',
  path: '/api/message/{id}',
  config: {
    auth: {
            strategy: 'jwt',
            scope: ['admin']
        },
    handler: msgController.deleteMessage,
  }
};
