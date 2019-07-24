'use strict';
module.exports = (sequelize, DataTypes) => {
  const GlassMakerPrices = sequelize.define('GlassMakerPrices', {
    focal: DataTypes.INTEGER,
    cysp2: DataTypes.INTEGER,
    cysp24: DataTypes.INTEGER,
    cysp4: DataTypes.INTEGER,
    novatis: DataTypes.INTEGER,
    essilor: DataTypes.INTEGER,
    zeiss: DataTypes.INTEGER,
    organic: DataTypes.INTEGER,
    polycarb: DataTypes.INTEGER,
    indice15: DataTypes.INTEGER,
    indice16: DataTypes.INTEGER,
    indice167: DataTypes.INTEGER,
    indice174: DataTypes.INTEGER,
    hc: DataTypes.INTEGER,
    hmc: DataTypes.INTEGER,
    bb: DataTypes.INTEGER,
    trans: DataTypes.INTEGER,
    couleur: DataTypes.INTEGER
  }, {});
  GlassMakerPrices.associate = function(models) {
    // associations can be defined here
  };
  return GlassMakerPrices;
};