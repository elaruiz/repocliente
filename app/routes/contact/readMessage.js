'use strict';
import { findMessage } from "../../controllers/MessageController";

// const msgController = require('../../controllers/index').messages;

export default {
    method: ['PUT', 'PATCH', 'GET'],
    path: '/api/message/{id}',
    config: {
        auth: {
            strategy: 'jwt',
            scope: ['admin']
        },
        handler: findMessage,
    }
};
