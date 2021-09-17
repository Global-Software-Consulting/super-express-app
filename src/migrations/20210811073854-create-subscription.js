'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserSubscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      stripeCustomerId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subscriptionId: {
        type: Sequelize.STRING,
      },
      interval: {
        type: Sequelize.ENUM('monthly', 'yearly'),
      },
      status: {
        type: Sequelize.ENUM('active', 'canceled', 'inactive'),
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        allowNull: false,
        reference: {
          model: 'Users',
          key: 'id',
          as: 'creator',
        },
      },
      subscriptionPlanId: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        reference: {
          model: 'SubscriptionPlans',
          key: 'id',
          as: 'subscriptionPlan',
        },
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
    await queryInterface.dropTable('UserSubscriptions');
  },
};
