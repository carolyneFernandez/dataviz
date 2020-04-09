'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Temperatures', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            value: {
                type: Sequelize.DECIMAL(10, 2)
            },
            value_max: {
                type: Sequelize.DECIMAL(10, 2)
            },
            value_min: {
                type: Sequelize.DECIMAL(10, 2)
            },
            feeling: {
                type: Sequelize.DECIMAL(10, 2)
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Temperatures');
    }
};