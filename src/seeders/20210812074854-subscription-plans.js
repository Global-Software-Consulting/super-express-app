'use strict';
const { createPrice, createProduct } = require('../stripe/stripe');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const standardProduct = await createProduct('standard');
    const standardMonthlyPrice = await createPrice(
      10,
      standardProduct.id,
      'month',
      'usd'
    );
    const standardAnnualPrice = await createPrice(
      100,
      standardProduct.id,
      'year',
      'usd'
    );

    let subscriptionPlans = [
      {
        name: 'free',
        productId: null,
        monthlyPriceId: null,
        annualPriceId: null,
        monthlyPrice: 0,
        annualPrice: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'standard',
        productId: standardProduct.id,
        monthlyPriceId: standardMonthlyPrice.id,
        annualPriceId: standardAnnualPrice.id,
        monthlyPrice: 10,
        annualPrice: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert('SubscriptionPlans', subscriptionPlans);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SubscriptionPlans', null, {});
  },
};
