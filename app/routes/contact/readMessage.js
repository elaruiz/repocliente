'use strict';

const msgController = require('../../controllers/index').messages;

module.exports = {
  method: ['PUT', 'PATCH', 'GET'],
  path: '/api/message/{id}',
  config: {
    auth: {
            strategy: 'jwt',
            scope: ['admin']
        },
    handler: msgController.findMessage,
  }
};
