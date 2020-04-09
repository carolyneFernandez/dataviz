'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Data', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            pression: {
                type: Sequelize.DECIMAL(10, 2)
            },
            humidity: {
                type: Sequelize.DECIMAL(10, 2)
            },
            weather: {
                type: Sequelize.STRING
            },
            dateObj: {
                type: Sequelize.DATE,
                allowNull: false
            },
            icon: {
                type: Sequelize.STRING,
                allowNull: true
            },
            temperatureId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Temperatures",
                    key: "id"
                },
                allowNull: true
            },
            windId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Winds",
                    key: "id"
                },
                allowNull: true
            },
            precipitationId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Precipitations",
                    key: "id"
                },
                allowNull: true
            },
            cloudId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Clouds",
                    key: "id"
                },
                allowNull: true
            },
            cityId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Cities",
                    key: "id"
                },
                allowNull: true
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
        return queryInterface.dropTable('Data');
    }
};