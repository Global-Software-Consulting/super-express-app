const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use(passport.initialize());
router.get(
  '/facebook',
  passport.authenticate('facebook', {
    session: false,
    scope: ['public_profile', 'email'],
  })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/',
    session: false,
  })
);

router.get(
  '/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
    accessType: 'offline',
    approvalPrompt: 'force',
  })
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  })
);

module.exports = router;
