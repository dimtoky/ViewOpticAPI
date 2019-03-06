'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brands = sequelize.define('Brands', {
    bname: DataTypes.STRING,
    bdescription: DataTypes.STRING,
    imgPth: DataTypes.STRING
  }, {});
  Brands.associate = function(models) {
    // associations can be defined here
    Brands.hasMany(models.Products, {
      foreignKey: 'idBrand', 
      sourceKey: 'id'
    });
  };
  return Brands;
};