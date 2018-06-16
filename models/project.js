'use strict';
module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('Project', {
    name_th: DataTypes.STRING,
    name_eng: DataTypes.STRING,
    province: DataTypes.STRING,
    start_date: DataTypes.DATE,
    finish_date: DataTypes.DATE,
    manager_contact: DataTypes.JSON,
  }, {
    timestamps: false,
  });
  Project.associate = function (models) {
    // associations can be defined here
    Project.hasMany(models.Camp);
  };
  return Project;
};