'use strict';

import { createMessage } from "../../controllers/MessageController";
import { MessageSchema } from "../../schemas/MessageSchema";

// const messageSchema = require('../../schemas/MessageSchema').messageSchema;
// const msgController = require('../../controllers/index').messages;

export default {
    method: 'POST',
    path: '/api/messages',
    config: {
        auth: false,
        handler: createMessage,
        // Validate the payload against the Joi schema
        validate: {
            payload: MessageSchema
        }
    }
};
