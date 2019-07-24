'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    idBrand: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER,
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
    quantity: DataTypes.INTEGER,
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

    Products.belongsTo(models.User, {
      foreignKey: 'idUser',
       targetKey: 'id'
    });

    Products.hasMany(models.orders, {
      foreignKey: 'idProduct', 
      sourceKey: 'id'
    });

    Products.belongsToMany(models.Stores, {through: 'Productstore', foreignKey: 'idProduct'})
  };
  return Products;
};