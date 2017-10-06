'use strict';

import Boom from 'boom';
import request from 'request';
import Models from '../models';
const Report = Models.report;
const User = Models.user;
const Membership = Models.membership;
const Sequelize = Models.Sequelize;
import { API_PROCESSOR } from "../constants";
import fs from 'fs';
import path from 'path';
import moment from 'moment';

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
        });
        (response <= 0 || isNaN(response)) ? res(Boom.forbidden(`Can't generate report`)) : res(response)
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
export const report = (reference) => {
    const now = moment(),
    date = now.clone();
    const filename = `./public/report_${date}_${reference}.pdf`;
    return new Promise(function (fulfill, reject){
    request(`${API_PROCESSOR}/api/property/process/${reference}/pdf`)
    .on('error', (err) => { 
        console.log(err)
        reject(err);
    })
    .on('response', (data) =>{
        data.pipe(fs.createWriteStream(filename))
        .on('finish', () => {
            fulfill(filename)
        })
    })
})
}

export const generateUserReport = (req, res) => { 
    report(req.params.reference)
    .then(file => {
        res.file(file)
    }).catch(err => {throw err})
}