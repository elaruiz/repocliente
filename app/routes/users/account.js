'use strict';
import { findUser } from "../../controllers/UserController";

// const usersController = require('../../controllers/index').users;

export default {
    method: 'GET',
    path: '/api/users/me',
    config: {
        auth: 'jwt',
        handler: findUser
    }
};