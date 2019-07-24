'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lens = sequelize.define('Lens', {
    lName: DataTypes.STRING,
    lBrand: DataTypes.STRING,
    lType: DataTypes.STRING,
    lPrice: DataTypes.INTEGER,
    lDescription: DataTypes.STRING,
    lImgPath: DataTypes.STRING,
    lquantity: DataTypes.INTEGER
  }, {});
  Lens.associate = function(models) {
    // associations can be defined here
  };
  return Lens;
};