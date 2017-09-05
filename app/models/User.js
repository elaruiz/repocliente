'use strict';

module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define('user',
        {
            name: {type: DataTypes.STRING, allowNull: false},
            email: {type: DataTypes.STRING, unique: true, allowNull: false },
            password: {type: DataTypes.STRING, allowNull: false},
            admin: DataTypes.BOOLEAN,
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: true,
        });
    User.beforeCreate(user => {
        user.admin = true })
    User.associate = (models) => {
        User.belongsToMany(models.plan, {through: { model: models.membership, unique: false }});
    };
    return User;
};