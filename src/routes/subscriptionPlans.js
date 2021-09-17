const express = require('express');
const router = express.Router();
const { subscriptionPlanController } = require('../controllers');
const auth = require('../middleware/auth');
const role = require('../middleware/roles');

router.post(
  '/',
  auth,
  role.checkRole('admin'),
  subscriptionPlanController.addPlan
);
router.get('/', auth, subscriptionPlanController.plans);
module.exports = router;
