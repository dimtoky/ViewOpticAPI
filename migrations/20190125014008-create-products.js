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
      forme: {
        allowNull :true,
        type: Sequelize.STRING
      },
      age: {
        allowNull :true,
        type: Sequelize.STRING
      },
      gender: {
        allowNull :true,
        type: Sequelize.STRING
      },
      size: {
        allowNull :true,
        type: Sequelize.STRING
      },
      couleur: {
        allowNull :true,
        type: Sequelize.STRING
      },
      rimtype: {
        allowNull :true,
        type: Sequelize.STRING
      },
      material: {
        allowNull :true,
        type: Sequelize.STRING
      },
      description: {
        allowNull :true,
        type: Sequelize.STRING
      },
      isAvailable: {
        allowNull :false,
        type: Sequelize.BOOLEAN
      },
      imgPath1: {
        allowNull :true,
        type: Sequelize.STRING
      },
      imgPath2: {
        allowNull :true,
        type: Sequelize.STRING
      },
      imgPath3: {
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