'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Camps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      has_goodspace: {
        type: Sequelize.BOOLEAN
      },
      project_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Projects', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        name: 'project_id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Camps');
  }
};