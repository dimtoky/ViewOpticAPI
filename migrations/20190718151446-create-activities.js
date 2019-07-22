'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      age: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      idProduct:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      age:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      beard:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      gender:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      mustache:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      race:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      chinsize:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      eyebrowscorners:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      eyebrowsposition:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      eyebrowssize:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      eyescorners:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      eyesdistance:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      eyesposition:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      eyesshape:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      hairbeard:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      haircolortype:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      hairforehead:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      hairlength:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      hairmustache:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      hairsides:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      hairtop:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      headshape:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      headwidth:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      mouthcorners:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      mouthheight:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      mouthwidth:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      noseshape:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      nosewidth:{
 allowNull: false,
 type: Sequelize.INTEGER
},
      value:{
 allowNull: false,
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
    return queryInterface.dropTable('Activities');
  }
};
