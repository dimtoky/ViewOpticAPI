'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull :false,
        type: Sequelize.STRING
      },
      password: {
        allowNull :false,
        type: Sequelize.STRING
      },
      idStore: {
        allowNull :false,
        type: Sequelize.INTEGER
      },
      isAdmin: {
        allowNull :false,
        type: Sequelize.BOOLEAN
      },
      mngBrand: {
        allowNull :false,
        type: Sequelize.BOOLEAN
      },
      mngProduct: {
        allowNull :false,
        type: Sequelize.BOOLEAN
      },
      mngLens: {
        allowNull :false,
        type: Sequelize.BOOLEAN
      },
      mngConfV: {
        allowNull :false,
        type: Sequelize.BOOLEAN
      },
      mngConfL: {
        allowNull :false,
        type: Sequelize.BOOLEAN
      },
      mngReservations: {
        allowNull :false,
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('Users');
  }
};