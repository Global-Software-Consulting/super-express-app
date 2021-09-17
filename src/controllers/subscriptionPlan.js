/*eslint-disable*/
const { SubscriptionPlan } = require('../models');
require('dotenv').config();
const apiResponse = require('../utils/apiResponse');
const { createProduct, createPrice } = require('../stripe/stripe');

exports.addPlan = async (req, res) => {
  try {
    const { name, monthlyPrice, annualPrice } = req.body;
    if (monthlyPrice !== 0 && name && annualPrice !== 0) {
      const product = await createProduct(name);
      const productId = product.id;
      const monthPrice = await createPrice(monthlyPrice, productId, 'month');
      const yearPrice = await createPrice(annualPrice, productId, 'year');
      req.body.productId = productId;
      req.body.monthlyPriceId = monthPrice.id;
      req.body.annualPriceId = yearPrice.id;
    }
    const plan = await SubscriptionPlan.create(req.body);
    return apiResponse(res, 200, true, 'plan added successfully', plan);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

exports.plans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.findAll({
      where: { status: 'active' },
    });
    return apiResponse(res, 200, true, 'subscription plans', plans);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};
