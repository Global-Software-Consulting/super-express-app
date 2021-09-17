'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SubscriptionPlans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productId: {
        type: Sequelize.STRING,
      },
      monthlyPrice: {
        type: Sequelize.INTEGER,
      },
      annualPrice: {
        type: Sequelize.INTEGER,
      },
      monthlyPriceId: {
        type: Sequelize.STRING,
      },
      annualPriceId: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SubscriptionPlans');
  },
};
