'use strict';

module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define('User', {
        name: {type: DataTypes.STRING, allowNull: false},
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: {type: DataTypes.STRING, allowNull: false},
        admin: DataTypes.BOOLEAN
    },{
        timestamps: true,

        // don't delete database entries but set the newly added attribute deletedAt
        // to the current date (when deletion was done). paranoid will only work if
        // timestamps are enabled
        paranoid: true,

        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true,
    });
   /* User.associate = (models) => {
        User.hasMany(models.*modelo*, {
            foreignKey: 'id'
        });
    };*/
    return User;
};