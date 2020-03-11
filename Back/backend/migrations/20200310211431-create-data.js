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
            date: {
                type: Sequelize.DATE
            },
            pression: {
                type: Sequelize.DECIMAL
            },
            humidity: {
                type: Sequelize.DECIMAL
            },
            weather: {
                type: Sequelize.STRING
            },
            temperatureId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Temperatures",
                    key: "id"
                }
            },
            windId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Winds",
                    key: "id"
                }
            },
            precipitationId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Precipitations",
                    key: "id"
                }
            },
            cloudId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Clouds",
                    key: "id"
                }
            },
            cityId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Cities",
                    key: "id"
                }
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