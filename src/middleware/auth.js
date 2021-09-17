const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { config } = require('../config');
const loginAuth = async function (req, res, next) {
  // Get token from header
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({
      status: false,
      message: 'Your are not logged in',
    });
  }

  // Verify token
  try {
    const decoded = await promisify(jwt.verify)(token, config.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: 'Invalid token',
    });
  }
};

module.exports = loginAuth;
