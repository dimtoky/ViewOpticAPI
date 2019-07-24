'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stores = sequelize.define('Stores', {
    storeName: DataTypes.STRING,
    address: DataTypes.STRING,
    tel: DataTypes.STRING,
    location: DataTypes.STRING
  }, {});
  Stores.associate = function (models) {
    Stores.belongsToMany(models.Products, { through: 'Productstore', foreignKey: 'idStore', as: 'products' })

    Stores.hasMany(models.orders, {
      foreignKey: 'idStore',
      sourceKey: 'id'
    });

    
  };
  return Stores;
};