'use strict';
module.exports = (sequelize, DataTypes) => {
  const Productstore = sequelize.define('Productstore', {
    idStore: DataTypes.INTEGER,
    idProduct: DataTypes.INTEGER
  }, {});
  Productstore.associate = function(models) {

    Productstore.belongsTo(models.Products, {
      foreignKey: 'idProduct',
       targetKey: 'id'
    });

    Productstore.belongsTo(models.Stores, {
      foreignKey: 'idStore',
       targetKey: 'id'
    });
  };
  return Productstore;
};