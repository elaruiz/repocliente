import {
    createConfiguration, deleteConfiguration, getAllConfigurations,
    getConfiguration, updateConfiguration
} from "../controllers/ConfigurationController";

let auth = {
    scope: ['admin'],
    strategy: 'jwt'
};

auth = false;

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
        handler: createConfiguration
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
        handler: updateConfiguration
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

export default [
    listAllConfigurationRoute,
    getConfigurationRoute,
    createConfigurationRoute,
    updaConfigurationRoute,
    deleteConfigurationRoute
];