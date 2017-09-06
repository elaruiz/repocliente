'use strict';

export const up = (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING
        },
        admin: {
            allowNull: false,
            type: Sequelize.BOOLEAN
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
        deleted_at: {
            type: Sequelize.DATE
        }

    });
};

export const down = (queryInterface, Sequelize) => queryInterface.dropTable('Users');