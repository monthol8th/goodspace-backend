'use strict';
module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('Project', {
    ID: DataTypes.STRING,
    nameTH: DataTypes.STRING,
    nameEng: DataTypes.STRING,
    province: DataTypes.STRING,
    startDate: DataTypes.STRING,
    finishDate: DataTypes.STRING,
    managerContact: DataTypes.JSON
  }, {});
  Project.associate = function(models) {
    // associations can be defined here
  };
  return Project;
};