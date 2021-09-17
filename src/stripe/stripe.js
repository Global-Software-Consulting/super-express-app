/*eslint-disable*/
const Stripe = require('stripe');
require('dotenv').config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const cardToken = (data) => {
  return stripe.tokens.create(data);
};

const createCustomer = (data) => {
  return stripe.customers.create(data);
};

const createCard = (customerId, data) => {
  return stripe.customers.createSource(customerId, data);
};

const getCustomerCardDetails = (customerId) => {
  return stripe.customers.retrieve(customerId);
};

const getAllCards = (customerId) => {
  return stripe.customers.listSources(customerId);
};

const deleteCustomerCard = (customerId, cardId) => {
  return stripe.customers.deleteSource(customerId, cardId);
};

const deleteCustomer = (customerId) => {
  return stripe.customers.del(customerId);
};

const createPrice = (amount, product, interval, currency = 'usd') => {
  return stripe.prices.create({
    unit_amount: amount * 100,
    currency: currency,
    product: product,
    recurring: {
      interval: interval,
    },
  });
};

const updatePrice = (stripePriceId, productId) => {
  return stripe.prices.update(stripePriceId, {
    product: productId,
    active: false,
  });
};

const createProduct = (name) => {
  return stripe.products.create({
    name: name,
  });
};

const updateProduct = (id, name) => {
  return stripe.products.update(id, { name });
};

const deleteProduct = (id) => {
  return stripe.products.update(id, {
    active: false,
  });
};
const createSubscriptionOnStripeWithDiscount = (
  customerId,
  priceId,
  source,
  discount
) => {
  return stripe.subscriptions.create({
    customer: customerId,
    default_source: source,
    items: [{ price: priceId }],
    coupon: discount,
  });
};
const createSubscriptionOnStripe = (customerId, priceId, source) => {
  return stripe.subscriptions.create({
    customer: customerId,
    default_source: source,
    items: [{ price: priceId }],
  });
};

const updateSubscriptionOnStripe = (
  subscriptionId,
  subscriptionDataId,
  newPrice,
  source
) => {
  return stripe.subscriptions.update(subscriptionId, {
    default_source: source,
    proration_behavior: 'create_prorations',
    items: [
      {
        id: subscriptionDataId,
        price: newPrice,
      },
    ],

    proration_date: Math.floor(Date.now() / 1000),
  });
};

const subscriptionsList = (customerId) => {
  return stripe.subscriptions.list({ customer: customerId });
};

const cancelSubscription = (subscriptionId) => {
  return stripe.subscriptions.del(subscriptionId, {
    invoice_now: true,
  });
};

const inActiveSubscription = (subscriptionId) => {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
};

const reactivateSubscription = (subscriptionId) => {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false,
  });
};

const getSubscriptionFromStripe = (subscriptionStripeId) => {
  return stripe.subscriptions.retrieve(subscriptionStripeId);
};
const getInvoiceFromStripe = (invoiceId) => {
  return stripe.invoices.retrieve(invoiceId);
};

module.exports = {
  cardToken,
  createCustomer,
  createCard,
  getCustomerCardDetails,
  deleteCustomerCard,
  deleteCustomer,
  getAllCards,
  createPrice,
  createProduct,
  createSubscriptionOnStripe,
  updateSubscriptionOnStripe,
  subscriptionsList,
  cancelSubscription,
  getSubscriptionFromStripe,
  updateProduct,
  updatePrice,
  deleteProduct,
  getInvoiceFromStripe,
  createSubscriptionOnStripeWithDiscount,
  inActiveSubscription,
  reactivateSubscription,
};
