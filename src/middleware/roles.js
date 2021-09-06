const apiResponse = require('../utils/apiResponse');

const Roles = {
  admin: 'admin',
  publisher: 'editor',
  user: 'user',
};

const checkRole =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) {
      return apiResponse(res, 'error', 'You are not logged in', 401);
    }
    const isAllowed = roles.find((role) => req.user.role === role);
    if (!isAllowed) {
      return apiResponse(res, 403, 'You are not allowed to access this route');
    }

    return next();
  };
const role = { Roles, checkRole };
module.exports = role;
