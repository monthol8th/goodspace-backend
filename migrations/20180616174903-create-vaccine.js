'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Vaccines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      injected_at: {
        type: Sequelize.DATE
      },
      age: {
        type: Sequelize.INTEGER
      },
      child_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Children', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        name: 'child_id',
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
    return queryInterface.dropTable('Vaccines');
  }
};