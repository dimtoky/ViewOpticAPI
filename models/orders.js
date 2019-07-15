'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    idProduct: DataTypes.INTEGER,
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    mail: DataTypes.STRING,
    adresse: DataTypes.STRING,
    tel: DataTypes.INTEGER,
    isDone: DataTypes.BOOLEAN
  }, {});
  orders.associate = function(models) {
    // associations can be defined here
    orders.belongsTo(models.Products, {
      foreignKey: 'idProduct',
       targetKey: 'id'
    });
  };
  return orders;
};