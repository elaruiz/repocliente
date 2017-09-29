'use strict';

const ReportModel = (sequelize, DataTypes) => {
    const Report = sequelize.define('report', {
        address: { type: DataTypes.STRING },
        reference: { type: DataTypes.STRING },
        link: { type: DataTypes.STRING }
    },{
        timestamps: true,
        paranoid: true,
        underscored: true,
    });
    Report.associate = (models) => {
        Report.belongsTo(models.user);
    };
    
    return Report;
};

export default ReportModel;