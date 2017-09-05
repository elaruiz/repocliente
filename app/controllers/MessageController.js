'use strict'

const Boom = require('boom');
const Message = require('../models').message;

module.exports = {

    findAllMessages(req, res) {
        return Message
            .findAll({ offset: req.query.page, limit: req.query.size || 20, order: [['created_at', 'DESC']] })
            .then(msgs => {
                if (!msgs) {
                    return res(Boom.notFound('Not Found'));
                }
                return res({data: msgs}).code(200);
            })
            .catch((error) => res(Boom.badRequest(error)));
    },

    createMessage(req, res) {
        req.payload.read = false;
        return  Message
                    .create(req.payload)
                    .then(msg => res({ data: msg }).code(201))
                    .catch(error => Boom.badRequest(error));

    },

    findMessage(req, res) {
        return Message
            .findById(req.params.id)
            .then(msg => {
                msg
                    .update({read: true})
                    .then( msg => res({data: msg}).code(200))
                    .catch(error => res(Boom.notFound('Not Found')))
            })
            .catch(error => res(Boom.badRequest(error)));
    },

    deleteMessage(req, res) {
        return Message
            .findById(req.params.id)
            .then(msg => {
                msg
                    .destroy()
                        .then(success => res().code(204))
                        .catch(error => res(Boom.badRequest(error)))
            })
            .catch(error => res(Boom.notFound('Not Found')));
    },

};