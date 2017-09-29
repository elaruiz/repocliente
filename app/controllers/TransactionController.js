'use strict'

import Boom from 'boom';
import {createMembership, updateMembershipEndDate} from "./MembershipController";
import Models from '../models';
import moment from 'moment';
import {stripeCharge} from "../util/stripeFunctions";
import {paypalCharge, paypalExecutePayment} from "../util/paypalFunctions";
import _ from "lodash";

const Transaction = Models.transaction;
const Membership = Models.membership;
const Plan = Models.plan;
const User = Models.user;

/* Stripe Transactions */

export const paymentStripe = async (req, res ) => {
    let data = Object.assign({}, req.pre.plan.data.dataValues);
    try{
    let charge = await stripeCharge(req, data);
    let membership = await createMembership(req);
    let transaction = await createTransactionStripe(charge, membership);
    res({data: membership}).code(201);
    } catch(e) {
        res(Boom.badRequest(e));
    }
};

export const paymentMembershipStripe = async (req, res) => {
    let data = Object.assign({}, req.pre.membership.data.dataValues.plan.dataValues);
    try{
        let charge = await stripeCharge(req, data);
        let transaction = await createTransactionStripe(charge, req.pre.membership.data.dataValues);
        await updateMembershipEndDate(req.pre.membership.data.dataValues);    
        res({data: transaction}).code(201)
    } catch(e) {
        res(Boom.badRequest(e));
    }
};

let createTransactionStripe = async (charge, membership) => {
    try {
   return await Transaction
        .create({
            paid_date: moment.unix(charge.created).utc(),
            total: charge.amount/100,
            currency: charge.currency,
            status: charge.status,
            transaction_id: charge.id,
            description: charge.description,
            payment_method: "stripe",
            membership_id: membership.id
        });
    } catch(e) {
       throw new Error(e)
    }
};

/* PayPal Transactions */

export const paymentPaypal = async (req, res) => {
    try {
        let data = Object.assign({}, req.pre.plan.data.dataValues);
        let payment = await paypalCharge(data);
        res(payment);
    } catch (error) {
        res(Boom.badRequest(error))
    }
};

export const paymentExecutePaypal = async (req, res) => {
    try {
        let payment = await paypalExecutePayment(req);
        if (payment.transactions[0].related_resources[0].sale.state === "completed") {
            let membership = await createMembership(req);
            let transaction = await createTransactionPaypal(payment, membership);
            res({data: membership}).code(201);
        }
    } catch (error) {
        res(Boom.badRequest(error));
    }
};

let createTransactionPaypal = async (charge, membership) => {
    try {
        return await Transaction
            .create({
                paid_date: charge.transactions[0].related_resources[0].sale.create_time,
                total: charge.transactions[0].related_resources[0].sale.amount.total,
                currency: charge.transactions[0].related_resources[0].sale.amount.currency,
                status: charge.transactions[0].related_resources[0].sale.state,
                transaction_id: charge.transactions[0].related_resources[0].sale.id,
                description: charge.transactions[0].description,
                payment_method: "paypal",
                membership_id: membership.id
            });
    }
    catch(e) {
        new Error(e)
    }
};

export const paymentMembershipPaypal = async (req, res) => {
    try {
        let data = Object.assign({}, req.pre.membership.data.dataValues.plan.dataValues);
        let payment = await paypalCharge(data);
        res(payment).code(201);
    } catch (error) {
        res(Boom.badRequest(error))
    }
};

export const paymentExecuteMembershipPaypal = async (req, res) => {
    try {
        let payment = await paypalExecutePayment(req);
        if (payment.transactions[0].related_resources[0].sale.state === "completed") {
            await updateMembershipEndDate(req.pre.membership.data.dataValues);
            let transaction = await createTransactionPaypal(payment, req.pre.membership.data.dataValues);
            res({data: transaction}).code(201);
        }
    } catch (error) {
        res(Boom.badRequest(error));
    }
};

const searchBalances = (req, res) => {

}

export const findUserBalance = (req, res) => {
    let q = _.omit(req.query, ['start', 'end', 'size', 'page']);
    return Transaction
        .findAll({
            offset: req.query.page,
            limit: req.query.size || 20,
            order: [['created_at', 'DESC']],
            where: (req.query.start && req.query.end)? Object.assign({created_at: {$between: [req.query.start, req.query.end]}}, q) : q,
            include: [{
                model : Membership,
                where: {user_id: req.auth.credentials.id },
                include: {model:Plan, attributes: ['id', 'name']},
                attributes: ['id'] }],
            attributes: ['id', 'paid_date', 'total', 'payment_method', 'transaction_id']  
        })
        .then(transactions => res({data: transactions}).code(200))
        .catch((error) => res(Boom.badRequest(error)));
};

export const findAllBalances = (req, res) => {
    let q = _.omit(req.query, ['start', 'end', 'size', 'page']);
    return Transaction
        .findAll({
            offset: req.query.page,
            limit: req.query.size || 20,
            order: [['created_at', 'DESC']],
            where: (req.query.start && req.query.end)? Object.assign({created_at: {$between: [req.query.start, req.query.end]}}, q) : q,
            include: [{ 
                model : Membership, 
                where:  (req.params.userId) ? {user_id :req.params.userId} : 
                (req.params.planId) ? {plan_id:req.params.planId} : 
                {},
                include: [{model:Plan, attributes: ['id', 'name']}, 
                {model:User, attributes: ['id', 'name']}],
                attributes: ['id'] }],
            attributes: ['id', 'paid_date', 'total', 'payment_method','transaction_id']
        })
        .then(transactions => res({data: transactions}).code(200) )
        .catch((error) => res(Boom.badRequest(error)));
};