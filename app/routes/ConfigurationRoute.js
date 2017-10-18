import {
    createConfiguration, deleteConfiguration, findConfigurationByName, getAllConfigurations,
    getConfiguration, updateConfiguration, verifyUniqueConf
} from "../controllers/ConfigurationController";
import { createOrEditConfSchema } from "../schemas/ConfigurationSchema";
import { ErrorMsg } from "../util/responses";

const auth = {
    scope: ['admin'],
    strategy: 'jwt'
};

const listAllConfigurationRoute = {
    method: 'GET',
    path: '/api/configs',
    config: {
        auth,
        handler: getAllConfigurations
    }
};

const createConfigurationRoute = {
    method: 'POST',
    path: '/api/configs',
    config: {
        auth,
        pre: [{ method: verifyUniqueConf }],
        handler: createConfiguration,
        validate: {
            payload: createOrEditConfSchema,
            failAction: (req, res, source, error) => res(ErrorMsg(error))
        }
    }
};

const getConfigurationRoute = {
    method: 'GET',
    path: '/api/config/{id}',
    config: {
        auth,
        handler: getConfiguration
    }
};

const updaConfigurationRoute = {
    method: ['PUT', 'PATCH'],
    path: '/api/config/{id}',
    config: {
        auth,
        handler: updateConfiguration,
        validate: {
            payload: createOrEditConfSchema,
            failAction: (req, res, source, error) => res(ErrorMsg(error))
        }
    }
};

const deleteConfigurationRoute = {
    method: 'DELETE',
    path: '/api/config/{id}',
    config: {
        auth,
        handler: deleteConfiguration,
    }
};

const getConfigurationByName = {
    method: 'GET',
    path: '/api/config/{names}/value',
    config: {
        auth: false,
        handler: findConfigurationByName,
    }
};

export default [
    listAllConfigurationRoute,
    getConfigurationRoute,
    createConfigurationRoute,
    updaConfigurationRoute,
    deleteConfigurationRoute,
    getConfigurationByName
];