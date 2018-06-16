'use strict';
module.exports = (sequelize, DataTypes) => {
  var Child = sequelize.define('Child', {
    name: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    nationality: DataTypes.STRING,
    sex: DataTypes.STRING,
    school: DataTypes.JSON,
  }, {
    foreignkeyConstraint: true,
  });
  Child.associate = function(models) {
    // associations can be defined here
    Child.belongsTo(models.Worker,{foreignKey: 'parent_id'});
  };
  return Child;
};