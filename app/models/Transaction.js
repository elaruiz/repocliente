'use strict';

const TransactionModel = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('transaction', {
        paid_date: { type: DataTypes.DATE},
        subtotal: {type: DataTypes.DECIMAL},
        tax: {type: DataTypes.DECIMAL},
        total: {type: DataTypes.DECIMAL},
        currency: {type:DataTypes.STRING(3)},
        status: {type:DataTypes.STRING},
        transaction_id: {type: DataTypes.STRING},
        payment_method: {type: DataTypes.STRING},
        description: {type: DataTypes.STRING},

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
    Transaction.associate = (models) => {
        Transaction.belongsTo(models.membership);
    };

    return Transaction;
};

export default TransactionModel;