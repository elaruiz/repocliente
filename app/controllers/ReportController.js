'use strict';

import Boom from 'boom';
import Models from '../models';
const Report = Models.report;
const User = Models.user;
const Membership = Models.membership;
const Sequelize = Models.Sequelize;

export const findUserReports = (req, res) => {
    return User
        .findOne({ where: { id: req.auth.credentials.id }})
        .then(user => { 
            user.getReports({offset: req.query.page, limit: req.query.size || 10})
            .then(reports => res({data: reports}).code(200))
            .catch((error) => res(Boom.badRequest(error)));
        })
        .catch((error) => res(Boom.badRequest(error)));
};

export const findUserReport = (req, res) => {
    return Report
        .findOne({ where: {user_id: req.auth.credentials.id, id: req.params.id }})
        .then(report  => res({data: report}).code(200))
        .catch((error) => res(Boom.badRequest(error)));
};

export const createReport = (req, res) => {
    return Report
        .create(req.payload)
        .then(report => res({data: report}).code(201))
        .catch(error => Boom.badRequest(error));
};

export const checkUserReports = async (req, res) => {
    try {
let response = await Membership
    .sum('remaining_reports', {
        where: {
            user_id: req.auth.credentials.id
        }
    })
    response <= 0 ? res(Boom.forbidden('You have exceeded the reporting limit')) :
    res(response)
}
    catch (err) {
        res(Boom.badRequest(err))
    }
}

export const remainingReports = async (req, res) => {
    try {
let response = await Membership
    .findOne({
        where: {
            user_id: req.auth.credentials.id,
            remaining_reports: { $gt: 0}   
        },
        order: [['end_date', 'ASC']]
    })
let reports = await response
    .update({remaining_reports: response.dataValues.remaining_reports-1});
res(reports)
}
    catch (err) {
        res(Boom.badRequest(err))
    }
}



export const generateUserReport = async (req, res) => {
    try {

}
    catch (err) {
        res(Boom.badRequest(err))
    }
}


