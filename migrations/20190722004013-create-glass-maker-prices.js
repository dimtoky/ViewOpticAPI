'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GlassMakerPrices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      focal: {
        type: Sequelize.INTEGER
      },
      cysp2: {
        type: Sequelize.INTEGER
      },
      cysp24: {
        type: Sequelize.INTEGER
      },
      cysp4: {
        type: Sequelize.INTEGER
      },
      novatis: {
        type: Sequelize.INTEGER
      },
      essilor: {
        type: Sequelize.INTEGER
      },
      zeiss: {
        type: Sequelize.INTEGER
      },
      organic: {
        type: Sequelize.INTEGER
      },
      polycarb: {
        type: Sequelize.INTEGER
      },
      indice15: {
        type: Sequelize.INTEGER
      },
      indice16: {
        type: Sequelize.INTEGER
      },
      indice167: {
        type: Sequelize.INTEGER
      },
      indice174: {
        type: Sequelize.INTEGER
      },
      hc: {
        type: Sequelize.INTEGER
      },
      hmc: {
        type: Sequelize.INTEGER
      },
      bb: {
        type: Sequelize.INTEGER
      },
      trans: {
        type: Sequelize.INTEGER
      },
      couleur: {
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
    return queryInterface.dropTable('GlassMakerPrices');
  }
};