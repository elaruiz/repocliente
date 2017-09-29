'use strict';

import moment from 'moment';

const MemberShipModel = (sequelize, DataTypes) =>{
    const Membership = sequelize.define('membership', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        end_date: {type: DataTypes.DATEONLY},
        remaining_reports : DataTypes.INTEGER,
    },{
        timestamps: true,
        paranoid: true,
        underscored: true
    }
    );
    Membership.beforeCreate((membership, plan) => {
        const now = moment(),
            future = now.clone();
        let p = plan.data.dataValues;
        membership.end_date = future.add(p.interval_count, p.interval_time);
    });

    Membership.associate = (models) => {
        Membership.belongsTo(models.user, {onDelete: 'CASCADE', hooks: true});
        Membership.belongsTo(models.plan);
        Membership.hasMany(models.transaction);
    };
    return Membership;
};

export default MemberShipModel;