

import {createReport, findUserReport, findUserReports, checkUserReports, remainingReports} from "../controllers/ReportController";

const createReportRoute =  {
    method: 'POST',
    path: '/api/reports',
    config: {
        auth: {
            strategy: 'jwt',
        },
        handler: createReport,
    }
};

const readUserReportRoute = {
    method: 'GET',
    path: '/api/report/{id}',
    config: {
        auth: {
            strategy: 'jwt',
        },
        handler: findUserReport,
    }
};

const readUserReportsRoute = {
    method: 'GET',
    path: '/api/reports',
    config: {
        auth: {
            strategy: 'jwt',
        },
        handler: findUserReports,
    }
};

const generateReportRoute = {
    method: 'GET',
    path: '/api/reports/generate',
    config: {
        auth: {
            strategy: 'jwt',
        },
        pre: [{ method: checkUserReports, assign: 'reports' }],
        handler: remainingReports
        
    }
};

export default [
    createReportRoute,
    readUserReportsRoute,
    readUserReportRoute,
    generateReportRoute
];