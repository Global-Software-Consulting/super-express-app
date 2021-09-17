const express = require('express');
const router = express.Router();
const blogsRoutes = require('./blog');
const userRoutes = require('./user');
const subscriptionPlan = require('./subscriptionPlans');
const purchasedSubscription = require('./userSubscriptions');

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Apis running successfully',
  });
});
router.use('/user', userRoutes);
router.use('/blog', blogsRoutes);
router.use('/plan', subscriptionPlan);
router.use('/purchasedSubscription', purchasedSubscription);
router.use('/blog', blogsRoutes);

module.exports = router;
