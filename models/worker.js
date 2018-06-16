'use strict';
module.exports = (sequelize, DataTypes) => {
  var Worker = sequelize.define('Worker', {
    name: DataTypes.STRING,
    tel: DataTypes.STRING,
    nationality: DataTypes.STRING,
    follower: DataTypes.ARRAY(DataTypes.JSON),
    type: DataTypes.STRING
  }, {});
  Worker.associate = function(models) {
    // associations can be defined here
    Worker.belongsTo(models.Camp,{foreignKey: 'camp_id'});
    Worker.hasMany(models.Child,{foreignKey: 'parent_id'});
  };
  return Worker;
};