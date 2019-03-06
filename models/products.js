'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    idBrand: DataTypes.INTEGER,
    pname: DataTypes.STRING,
    price: DataTypes.INTEGER,
    forme: DataTypes.STRING,
    age: DataTypes.STRING,
    gender: DataTypes.STRING,
    size: DataTypes.STRING,
    couleur: DataTypes.STRING,
    rimtype: DataTypes.STRING,
    material: DataTypes.STRING,
    description: DataTypes.STRING,
    isAvailable: DataTypes.BOOLEAN,
    imgPath1: DataTypes.STRING,
    imgPath2: DataTypes.STRING,
    imgPath3: DataTypes.STRING
  }, {});
  Products.associate = function(models) {
    // associations can be defined here
    Products.belongsTo(models.Brands, {
      foreignKey: 'idBrand',
       targetKey: 'id'
    });
  };
  return Products;
};