const express = require('express');
const router = express.Router();
const { userSubscriptionController } = require('../controllers');
const auth = require('../middleware/auth');
// const rateLimit = require('express-rate-limit');
// const apiLimiter = rateLimit({
//   windowMs: 1 * 60 * 1000, // 15 minutes
//   max: 5,
// });
router.post('/', auth, userSubscriptionController.buy);
router.post('/card', auth, userSubscriptionController.addCard);
router.get(
  '/req-count',
  auth,
  // apiLimiter,
  userSubscriptionController.requestCount
);
module.exports = router;
