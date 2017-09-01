'use strict';

module.exports = (sequelize, DataTypes) =>{
    const Plan = sequelize.define('Plan', {
        name: {type: DataTypes.STRING, allowNull: false},
        description: { type: DataTypes.STRING},
        reports: {type: DataTypes.INTEGER},
        price: {type:DataTypes.DECIMAL},
        currency: {type:DataTypes.STRING(3)},
        term: {type: DataTypes.STRING, values: ['month', 'year']}
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
    /* User.associate = (models) => {
         User.hasMany(models.*modelo*, {
             foreignKey: 'id'
         });
     };*/
    return Plan;
};