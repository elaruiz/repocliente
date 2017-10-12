'use strict';

import {STRIPE_SK} from "../constants";
import stripePackage from 'stripe';
const stripe = stripePackage(STRIPE_SK);

export const stripeCharge = async (req,data) => {

    try {
       return await stripe.charges.create({
            amount: Math.round(data.price * 100),
            currency: data.currency.toUpperCase(),
            description: `Charge to user: ${req.auth.credentials.id}`,
            source: req.payload.stripeToken});
    } catch (e) {
        throw new Error(e);
    }
};