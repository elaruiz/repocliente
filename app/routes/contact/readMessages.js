'use strict';
import { findAllMessages } from "../../controllers/MessageController";

// const msgController = require('../../controllers/index').messages;

export default {
    method: 'GET',
    path: '/api/messages',
    config: {
        auth: {
            strategy: 'jwt',
            scope: ['admin']
        },
        handler: findAllMessages,
    }
};
