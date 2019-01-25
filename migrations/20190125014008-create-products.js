'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idBrand: {
        allowNull :true,
        type: Sequelize.INTEGER
      },
      pname: {
        allowNull :false,
        type: Sequelize.STRING
      },
      price: {
        allowNull :true,
        type: Sequelize.INTEGER
      },
      description: {
        allowNull :true,
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
    return queryInterface.dropTable('Products');
  }
};