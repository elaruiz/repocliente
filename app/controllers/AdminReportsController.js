import Boom from 'boom';
import Models from '../models/';
import moment from 'moment/moment';

const sequelize = Models.Sequelize;
const Op = sequelize.Op;
const Transaction = Models.transaction;
const Membership = Models.membership;
const Plan = Models.plan;
const User = Models.user;

export const getPaymentsByDateRange = (req, res) => {
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
};

export const getLast10Payments = (req, res) => {
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
};

export const getTotalPaymentsWeek = (req, res) => {
    let totalPaymentsByDate = [];
    let promises = [];
    let today = moment().subtract(6, 'd');

    for (let i = 0; i < 7; i++) {
        let startDate = today.clone().add(i, 'd').hours(0).minutes(0).seconds(0);
        let endDate = startDate.clone().add(23, 'h').add(59, 'm').add(59, 's');
        let start = startDate.format('YYYY-MM-DD HH:mm:ss');
        let end = endDate.format('YYYY-MM-DD HH:mm:ss');

        totalPaymentsByDate.push({
            date: startDate.format('YYYY-MM-DD'),
            currencies: {}
        });
        promises.push(
            Transaction
                .findAll({
                    attributes: ['currency', [sequelize.fn('sum', sequelize.col('total')), 'total']],
                    where: {
                        [Op.and]: {
                            membership_id: {
                                [Op.ne]: null
                            },
                            created_at: {
                                [Op.between]: [start, end]
                            }
                        }
                    },
                    group: 'currency'
                })
        );
    }

    Promise.all(promises)
        .then(results => {
            //Obtenemos las diferentes monedas usadas en los pagos
            let currencies = [];
            results.forEach(result => {
                result.forEach(currencyResult => {
                    let newCurrency = currencyResult.currency;
                    if (currencies.indexOf(newCurrency) === -1) {
                        currencies.push(newCurrency);
                    }
                })
            });

            totalPaymentsByDate.map(totalPayment => {
                currencies.forEach(currency => {
                    totalPayment['currencies'][currency] = 0;
                })
            });

            results.forEach((result, i) => {
                result.forEach(currencyResult => {
                    totalPaymentsByDate[i]['currencies'][currencyResult.currency] = isNaN(currencyResult.total) ? 0 : parseFloat(currencyResult.total);
                })
            });

            return totalPaymentsByDate;
        })
        .then(payments => res({ data: payments }).code(200))
        .catch(error => {
            res(Boom.badRequest(error));
        })
};