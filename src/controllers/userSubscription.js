/*eslint-disable*/
const { UserSubscription, User, SubscriptionPlan } = require('../models');
require('dotenv').config();
const apiResponse = require('../utils/apiResponse');
const {
  createCustomer,
  getAllCards,
  cardToken,
  createCard,
  createSubscriptionOnStripe,
} = require('../stripe/stripe');

// const createCustomerCard = () => {};

exports.buy = async (req, res) => {
  try {
    const userId = req.user.id;
    req.body.status = 'active';
    let stripeCustomerId;
    const { interval, subscriptionPlanId } = req.body;
    const plan = await SubscriptionPlan.findOne({
      where: { id: subscriptionPlanId, status: 'active' },
    });
    if (!plan) {
      return apiResponse(res, 404, false, 'No active plan with this id');
    }

    const user = await User.findByPk(req.user.id);
    const userSubscription = await UserSubscription.findOne({
      where: { userId },
    });

    if (!userSubscription) {
      const stripeCustomer = await createCustomer({
        email: user.email,
        description: `${user.email} created stripe customer`,
      });
      await UserSubscription.create({
        stripeCustomerId: stripeCustomer.id,
        userId,
      });
      console.log('stripeCustomer.id', stripeCustomer);
      stripeCustomerId = stripeCustomer.id;
    } else {
      stripeCustomerId = userSubscription.stripeCustomerId;
    }
    req.body.stripeCustomerId = stripeCustomerId;
    const planPrice =
      interval == 'monthly' ? plan.monthlyPrice : plan.annualPrice;
    if (planPrice !== 0) {
      const priceId =
        interval == 'monthly' ? plan.monthlyPriceId : plan.annualPriceId;

      const cardList = await getAllCards(userSubscription.stripeCustomerId);
      let card = null;
      if (!cardList || cardList.data.length < 1) {
        return apiResponse(res, 404, false, 'Please attach a payment card');
      }
      card = cardList.data.find((card) => card.funding === 'credit');
      const subscription = await createSubscriptionOnStripe(
        stripeCustomerId,
        priceId,
        card.id
      );
      await UserSubscription.update(
        {
          status: 'inactive',
        },
        { where: { userId, status: 'active' } }
      );
      req.body.subscriptionId = subscription.id;
    }
    req.body.userId = userId;
    const buySubscription = await UserSubscription.create(req.body);
    return apiResponse(
      res,
      201,
      true,
      'bought subscription successfully',
      buySubscription
    );
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

exports.addCard = async (req, res) => {
  try {
    const { exp_month, exp_year, cvc, number } = req.body;
    const { id } = req.user;
    let stripeCustomerId = null;
    const user = await User.findByPk(id);
    const userSubscription = await UserSubscription.findOne({
      where: { userId: id, status: 'active' },
    });
    if (!userSubscription) {
      const stripeCustomer = await createCustomer({
        email: user.email,
        description: `${user.name} created stripe customer`,
      });
      stripeCustomerId = stripeCustomer.id;
      await UserSubscription.create({
        stripeCustomerId: stripeCustomer.id,
        userId: req.user.id,
      });
    } else {
      stripeCustomerId = userSubscription.stripeCustomerId;
    }
    const token = await cardToken({
      card: {
        number,
        exp_month,
        exp_year,
        cvc,
      },
    });

    const card = await createCard(stripeCustomerId, {
      source: token.id,
    });

    return apiResponse(res, 200, true, 'card added successfully', card);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};

exports.requestCount = async (req, res) => {
  try {
    const user = await User.findOne(
      { where: { id: req.user.id } },
      {
        include: [
          {
            model: UserSubscription,
            as: 'subscription',
            where: { status: 'active' },
            // include: [{ model: SubscriptionPlan, as: 'subscriptionPlan' }],
          },
        ],
      }
    );
    return apiResponse(res, 200, true, `your have Subscription Plan`, user);
  } catch (error) {
    return apiResponse(res, 500, false, error.message);
  }
};
