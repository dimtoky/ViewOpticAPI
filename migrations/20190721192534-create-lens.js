'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Lens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lName: {
        type: Sequelize.STRING
      },
      lBrand: {
        type: Sequelize.STRING
      },
      lType: {
        type: Sequelize.STRING
      },
      lPrice: {
        type: Sequelize.INTEGER
      },
      lDescription: {
        type: Sequelize.STRING
      },
      lImgPath: {
        type: Sequelize.STRING
      },
      lquantity: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Lens');
  }
};