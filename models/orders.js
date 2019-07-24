'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    idProduct: DataTypes.INTEGER,
    idStore: DataTypes.INTEGER,
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    mail: DataTypes.STRING,
    adresse: DataTypes.STRING,
    tel: DataTypes.STRING,
    state: DataTypes.INTEGER
  }, {});
  orders.associate = function (models) {
    // associations can be defined here
    orders.belongsTo(models.Products, {
      foreignKey: 'idProduct',
      targetKey: 'id'
    });

    orders.belongsTo(models.Stores, {
      foreignKey: 'idStore',
      targetKey: 'id'
    });
  };
  return orders;
};