
import {
    findUser, deleteUser, forgot_password, verifyCredentials, setLastLogin,
    resetPassword, verifyUniqueUser, createUser, updateUser, findUsersSubAboutToExpire
} from "../controllers/UserController";
import {createToken, decodeToken} from "../util/token"
import {authenticateUserSchema, createUserSchema, payloadSchema} from "../schemas/UserSchema";
import _ from 'lodash';


const userRoute = {
    method: 'GET',
    path: '/api/users/me',
    config: {
        auth: 'jwt',
        handler: findUser
    }
};

const deleteUserRoute = {
    method: 'DELETE',
    path: '/api/users',
    config: {
        pre: [{ method: findUser, assign: 'user' }],
        handler: deleteUser,
        auth: {
            strategy: 'jwt'
        }
    }
};

const forgotPasswordRoute = {
    method: 'POST',
    path: '/api/users/forgot-password',
    config: {
        auth: false,
        handler: forgot_password
    }
};

const loginUserRoute = {
    method: 'POST',
    path: '/api/users/login',
    config: {
        auth: false,
        pre: [{ method: verifyCredentials, assign: 'user' }],
        handler: (req, res) => {
            let user = _.omit(req.pre.user.dataValues, ['password']);
            res({user: { token: createToken(req.pre.user), data: user }}).code(200);
        },
      validate: {
            payload: authenticateUserSchema
        }
    }
};

const logoutUserRoute = {
    method: 'GET',
    path: '/api/users/logout',
    config: {
        auth: 'jwt',
        handler: setLastLogin
    }
};

const resetPasswordRoute = {
    method: 'POST',
    path: '/api/users/reset_password',
    config: {
        pre: [{ method: decodeToken, assign: 'token' }],
        auth: false,
        handler: resetPassword
    }
};

const signupUserRoute = {
    method: 'POST',
    path: '/api/users',
    config: {
        auth: false,
        // Before the route handler runs, verify that the user is unique
        pre: [{ method: verifyUniqueUser }],
        handler: createUser,
        // Validate the payload against the Joi schema
        validate: {
            payload: createUserSchema
        }
    }
};

const updateUserRoute ={
    method: ['PATCH', 'PUT'],
    path: '/api/users',
    config: {
        pre: [{ method: findUser,  assign: 'user' }],
        handler: updateUser,
        validate: {
            payload: payloadSchema
        },
        auth: {
            strategy: 'jwt'
        }
    }
};

export default [
    deleteUserRoute,
    loginUserRoute,
    signupUserRoute,
    updateUserRoute,
    forgotPasswordRoute,
    resetPasswordRoute,
    logoutUserRoute,
    userRoute,
];