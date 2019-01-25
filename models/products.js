'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    pname: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {});
  Products.associate = function(models) {
    // associations can be defined here
    Products.belongsTo(models.Brands, {
      foreignKey: 'idBrand'
    });
  };
  return Products;
};