'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Cities', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            code_city: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            name: {
                type: Sequelize.STRING,
                unique: true
            },
            department: {
                type: Sequelize.STRING,
                allowNull: true
            },
            lon: {
                type: Sequelize.DECIMAL(10, 2)
            },
            lat: {
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
        return queryInterface.dropTable('Cities');
    }
};