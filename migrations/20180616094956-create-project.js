'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ID: {
        type: Sequelize.STRING
      },
      nameTH: {
        type: Sequelize.STRING
      },
      nameEng: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.STRING
      },
      finishDate: {
        type: Sequelize.STRING
      },
      managerContact: {
        type: Sequelize.JSON
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
    return queryInterface.dropTable('Projects');
  }
};