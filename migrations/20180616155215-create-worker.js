'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Workers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      nationality: {
        type: Sequelize.STRING
      },
      follower: {
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      type: {
        type: Sequelize.STRING
      },
      camp_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Camps', // name of Target model
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
    return queryInterface.dropTable('Workers');
  }
};