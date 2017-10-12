import { getServicesStatus } from "../controllers/ServicesController";

const serviceStatusRoute = {
    method: ['GET'],
    path: '/api/status',
    config: {
        auth: {
            scope: ['admin'],
            strategy: 'jwt'
        },
        handler: getServicesStatus
    }
};

export default [
    serviceStatusRoute
];