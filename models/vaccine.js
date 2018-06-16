'use strict';
module.exports = (sequelize, DataTypes) => {
  var Vaccine = sequelize.define('Vaccine', {
    type: DataTypes.STRING,
    injected_at: DataTypes.DATE,
    age: DataTypes.INTEGER
  }, {
    foreignkeyConstraint: true,
  });
  Vaccine.associate = function (models) {
    // associations can be defined here
    Vaccine.belongsTo(models.Child, {
      foreignKey: 'child_id'
    });
  };
  return Vaccine;
};