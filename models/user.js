'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    idStore: DataTypes.INTEGER,
    isAdmin: DataTypes.BOOLEAN,
    mngBrand: DataTypes.BOOLEAN,
    mngProduct: DataTypes.BOOLEAN,
    mngLens: DataTypes.BOOLEAN,
    mngConfV: DataTypes.BOOLEAN,
    mngConfL: DataTypes.BOOLEAN,
    mngReservations: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Products, {
      foreignKey: 'idUser', 
      sourceKey: 'id'
    });
  };
  return User;
};