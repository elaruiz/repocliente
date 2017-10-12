'use strict'

import Boom from 'boom';
// const Message = require('../models').message;
import Models from '../models';
const Message = Models.message;

// module.exports = {

    export const findAllMessages = (req, res) => {
        return Message
            .findAll({ offset: req.query.page, limit: req.query.size || 20, order: [['created_at', 'DESC']] })
            .then(msgs => res({data: msgs}).code(200) )
            .catch((error) => res(Boom.badRequest(error)));
    };

    export const createMessage = (req, res) => {
        req.payload.read = false;
        return  Message
            .create(req.payload)
            .then(msg => res({ data: msg }).code(201))
            .catch(error => res(Boom.badRequest(error)));

    };
    export const findMessage = async(req, res) => {
        try{
        let msg= await Message.findById(req.params.id)
        msg.update({read: true}).then(m => res({data: m})).catch(e => res.Boom.badRequest(e))
        
        } catch (error) {
            res(Boom.badRequest(error))
        }
                    
    };

    export const deleteMessage = (req, res) => {
        return Message
            .findById(req.params.id)
            .then(msg => {
                msg
                    .destroy()
                        .then(success => res().code(204))
                        .catch(error => res(Boom.badRequest(error)))
            })
            .catch(error => res(Boom.badRequest(error)));
    };

// };