
import {createMessage, deleteMessage, findAllMessages, findMessage} from "../controllers/MessageController";
import {MessageSchema} from "../schemas/MessageSchema";

const deleteMessageRoute = {
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

const readMessageRoute = {
    method: ['PUT', 'PATCH'],
    path: '/api/message/{id}',
    config: {
        auth: {
            strategy: 'jwt',
            scope: ['admin']
        },
        handler: findMessage,
    }
};

const readMessagesRoute =  {
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

const sendMessageRoute= {
    method: 'POST',
    path: '/api/messages',
    config: {
        auth: {
            strategy: 'jwt',
            mode: 'try'
        },
        handler: createMessage,
        // Validate the payload against the Joi schema
        validate: {
            payload: MessageSchema
        }
    }
};

export default [
    deleteMessageRoute,
    readMessagesRoute,
    readMessageRoute,
    sendMessageRoute
];
