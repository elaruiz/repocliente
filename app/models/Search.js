'use strict';

const SearchModel = (sequelize, DataTypes) => {
    const Search = sequelize.define('search', {
        address: { type: DataTypes.STRING},
        reference: {type: DataTypes.STRING},
        url: {type: DataTypes.STRING}
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
    Search.associate = (models) => {
        Search.belongsTo(models.user);
    };

    return Search;
};

export default SearchModel;