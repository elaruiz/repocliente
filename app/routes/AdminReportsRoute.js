import { getLast10Payments, getPaymentsByDateRange, getTotalPaymentsWeek } from "../controllers/AdminReportsController";

let auth = {
    scope: ['admin'],
    strategy: 'jwt'
};

const getPaymentsByDate = {
    method: 'GET',
    path: '/api/admin/report/payment',
    config: {
        auth,
        handler: getPaymentsByDateRange
    }
};

const last10Payments = {
    method: 'GET',
    path: '/api/admin/report/payment/last',
    config: {
        auth,
        handler: getLast10Payments
    }
};

const totalPaymentsWeek = {
    method: 'GET',
    path: '/api/admin/report/payment/week',
    config: {
        auth,
        handler: getTotalPaymentsWeek
    }
};

export default [
    getPaymentsByDate,
    last10Payments,
    totalPaymentsWeek
]