'use strict';
import { setLastLogin } from "../../controllers/UserController";

// const usersController = require('../../controllers/index').users;

export default {
    method: 'GET',
    path: '/api/users/logout',
    config: {
        auth: 'jwt',
        handler: setLastLogin
    }
};