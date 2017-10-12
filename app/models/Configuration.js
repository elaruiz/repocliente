const ConfigurationModel = (sequelize, DataTypes) => {
    const Configuration = sequelize.define('configuration', {
        name: { type: DataTypes.STRING, unique: true, allowNull: false},
        type: {type: DataTypes.STRING, allowNull: false},
        value: {type: DataTypes.TEXT, allowNull: false}
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

    return Configuration;
};

export default ConfigurationModel;