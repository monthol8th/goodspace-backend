'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Children', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATE
      },
      nationality: {
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.STRING
      },
      school: {
        type: Sequelize.JSON
      },
      parent_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Workers', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        name: 'parent_id',
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
    return queryInterface.dropTable('Children');
  }
};