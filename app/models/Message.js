'use strict';

module.exports = (sequelize, DataTypes) =>{
    const Message = sequelize.define('message', {
        sender: {type: DataTypes.STRING, allowNull: false},
        phone: { type: DataTypes.STRING},
        email: {type: DataTypes.STRING},
        subject: {type:DataTypes.STRING},
        content: {type:DataTypes.STRING},
        read: {type: DataTypes.BOOLEAN}
    },{
        timestamps: true,
        // don't delete database entries but set the newly added attribute deleted_at
        // to the current date (when deletion was done). paranoid will only work if
        // timestamps are enabled.
        paranoid: true,
        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true,
    });

    return Message;
};