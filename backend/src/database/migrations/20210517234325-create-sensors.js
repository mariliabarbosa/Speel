'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sensors', {
      id:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      state:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model:'users', key: 'id' },
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sensors');
  }
};
