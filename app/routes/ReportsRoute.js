import {
    createReport,
    findUserReport,
    findUserReports,
    checkUserReports,
    remainingReports,
    generateUserReport
} from "../controllers/ReportController";


const createReportRoute = {
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

const getReportRoute = {
    method: 'GET',
    path: '/api/reports/property/{reference}',
    config: {
        auth: {
            strategy: 'jwt',
        },
        pre: [{ method: checkUserReports, assign: 'reports' }],
        handler: generateUserReport
    }
};

export default [
    createReportRoute,
    readUserReportsRoute,
    readUserReportRoute,
    generateReportRoute,
    getReportRoute
];