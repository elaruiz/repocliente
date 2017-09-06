'use strict';
import { deleteMessage } from "../../controllers/MessageController";

// const msgController = require('../../controllers/index').messages;

export default {
    method: 'DELETE',
    path: '/api/message/{id}',
    config: {
        auth: {
            strategy: 'jwt',
            scope: ['admin']
        },
        handler: deleteMessage,
    }
};
