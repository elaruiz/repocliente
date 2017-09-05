'use strict';

const moment = require('moment');


module.exports = (sequelize, DataTypes) =>{
    const Membership = sequelize.define('membership', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        payment_method: {type: DataTypes.STRING, allowNull: false},
        next_payment: {type: DataTypes.DATEONLY},
    },{
        timestamps: true,
        paranoid: true,
        underscored: true
    }
    );
    Membership.beforeCreate((membership, term) => {
        const now = moment(),
            future = now.clone();
        membership.next_payment = future.add(term, 'days')})
    return Membership;
};