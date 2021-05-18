'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reports', {
      date:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      hour: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sensor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model:'sensors', key: 'id' },
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reports');
  }
};
