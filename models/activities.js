'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activities = sequelize.define('Activities', {
    idProduct: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    beard: DataTypes.INTEGER,
    gender: DataTypes.INTEGER,
    mustache: DataTypes.INTEGER,
    race: DataTypes.INTEGER,
    chinsize: DataTypes.INTEGER,
    eyebrowscorners: DataTypes.INTEGER,
    eyebrowsposition: DataTypes.INTEGER,
    eyebrowssize: DataTypes.INTEGER,
    eyescorners: DataTypes.INTEGER,
    eyesdistance: DataTypes.INTEGER,
    eyesposition: DataTypes.INTEGER,
    eyesshape: DataTypes.INTEGER,
    hairbeard: DataTypes.INTEGER,
    haircolortype: DataTypes.INTEGER,
    hairforehead: DataTypes.INTEGER,
    hairlength: DataTypes.INTEGER,
    hairmustache: DataTypes.INTEGER,
    hairsides: DataTypes.INTEGER,
    hairtop: DataTypes.INTEGER,
    headshape: DataTypes.INTEGER,
    headwidth: DataTypes.INTEGER,
    mouthcorners: DataTypes.INTEGER,
    mouthheight: DataTypes.INTEGER,
    mouthwidth: DataTypes.INTEGER,
    noseshape: DataTypes.INTEGER,
    nosewidth: DataTypes.INTEGER,
    value: DataTypes.INTEGER

  }, {});
  Activities.associate = function(models) {
    // associations can be defined here
    Activities.belongsTo(models.Products, {
      foreignKey: 'idProduct',
       targetKey: 'id'
    });
  };
  return Activities;
};
