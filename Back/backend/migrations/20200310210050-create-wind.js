'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Winds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      direction_degree: {
        type: Sequelize.DECIMAL
      },
      direction_code: {
        type: Sequelize.STRING
      },
      direction_name: {
        type: Sequelize.STRING
      },
      speed: {
        type: Sequelize.DECIMAL
      },
      speed_name: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Winds');
  }
};