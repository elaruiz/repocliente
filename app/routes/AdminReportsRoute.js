import Boom from 'boom';
import Models from '../models/';
import moment from 'moment/moment';

const Op = Models.Sequelize.Op;
const Transaction = Models.transaction;
const Membership = Models.membership;
const Plan = Models.plan;
const User = Models.user;

let auth = {
    scope: ['admin'],
    strategy: 'jwt'
};

auth = false;

const getPaymentsByDateRange = {
    method: 'GET',
    path: '/api/admin/report/payment',
    config: {
        auth,
        handler: (req, res) => {
            const { start, end, page = 1, size = 20 } = req.query;
            let fullStart = `${start} 00:00:00`;
            let fullEnd = `${end} 23:59:59`;
            Transaction
                .findAndCountAll({
                    offset: (page - 1) * size,
                    limit: size,
                    order: [['created_at', 'DESC']],
                    where: {
                        [Op.and]: {
                            created_at: {
                                [Op.between]: [fullStart, fullEnd]
                            },
                            membership_id: {
                                [Op.ne]: null
                            }
                        }
                    },
                    include: [{
                        model: Membership,
                        include: [{ model: Plan, attributes: ['id', 'name'] }, { model: User }],
                        attributes: ['id']
                    }],
                })
                .then(({ count, rows }) => {
                    const totalPages = Math.ceil(count / size);

                    res({
                        data: rows,
                        meta: {
                            totalPages,
                            currentPage: page
                        }
                    }).code(200);
                })
                .catch(error => {
                    res(Boom.badRequest(error));
                })
        }
    }
};

const last10Payments = {
    method: 'GET',
    path: '/api/admin/report/payment/last',
    config: {
        auth,
        handler: (req, res) => {
            Transaction
                .findAll({
                    limit: 10,
                    order: [['created_at', 'DESC']],
                    where: {
                        membership_id: {
                            [Op.ne]: null
                        }
                    },
                    include: [{
                        model: Membership,
                        include: [{ model: Plan, attributes: ['id', 'name'] }, { model: User }],
                        attributes: ['id']
                    }],
                })
                .then(rows => {
                    res({
                        data: rows
                    }).code(200);
                })
                .catch(error => {
                    res(Boom.badRequest(error));
                })
        }
    }
};

const totalPaymentsWeek = {
    method: 'GET',
    path: '/api/admin/report/payment/week',
    config: {
        auth,
        handler: (req, res) => {

            let totalPaymentsByDate = [];
            let promises = [];
            let today = moment().subtract(6,'d');

            for (let i = 0; i < 7; i++) {
                let startDate = today.clone().add(i,'d').hours(0).minutes(0).seconds(0);
                let endDate = startDate.clone().add(23, 'h').add(59, 'm').add(59, 's');
                let start = startDate.format('YYYY-MM-DD HH:mm:ss');
                let end = endDate.format('YYYY-MM-DD HH:mm:ss');

                totalPaymentsByDate.push({
                    date: startDate.format('YYYY-MM-DD')
                });
                promises.push(
                    Transaction
                        .sum('total', {
                            where: {
                                [Op.and]: {
                                    membership_id: {
                                        [Op.ne]: null
                                    },
                                    created_at: {
                                        [Op.between]: [start, end]
                                    }
                                }
                            }
                        })
                );
            }

            Promise.all(promises)
                .then(results => {
                    totalPaymentsByDate.forEach( (totalPayment,i) => {
                        totalPaymentsByDate[i]['total'] = isNaN(results[i]) ? 0 : results[i];
                    });
                    return totalPaymentsByDate;
                    /**/
                })
                .then(payments => res({data: payments}).code(200))
                .catch(error => {
                    res(Boom.badRequest(error));
                })
        }
    }
};

export default [
    getPaymentsByDateRange,
    last10Payments,
    totalPaymentsWeek
]