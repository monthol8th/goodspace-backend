'use strict';
module.exports = (sequelize, DataTypes) => {
  var Camp = sequelize.define('Camp', {
    location: DataTypes.STRING,
    province: DataTypes.STRING,
    has_goodspace: DataTypes.BOOLEAN,
  }, {
    foreignkeyConstraint: true,
  });
  Camp.associate = function (models) {
    // associations can be defined here
    Camp.belongsTo(models.Project,{foreignKey: 'project_id'});
    Camp.hasMany(models.Worker,{foreignKey: 'camp_id'});

  };
  return Camp;
};