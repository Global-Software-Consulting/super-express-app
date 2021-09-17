const {
  body,
  validationResult,
  // checkSchema,
  param,
} = require('express-validator');

// var statusCheck = {
//   status: {
//     isIn: {
//       options: [['active', 'blocked']],
//       errorMessage:
//         "Invalid status! status should be one of them ['active', 'blocked']",
//     },
//   },
// };
// var roleCheck = {
//   status: {
//     isIn: {
//       options: [['user', 'admin', 'editor']],
//       errorMessage:
//         "Invalid role! role should be one of them ['user', 'admin','editor']",
//     },
//   },
// };

const signUpValidator = () => {
  return [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'email is required').not().isEmpty(),
    // checkSchema(statusCheck),
    // checkSchema(roleCheck),
  ];
};

const changeUserStatus = () => {
  return [param('id', 'id parameter missing').not().isEmpty()];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).send({
    // status: false,
    errors: extractedErrors,
  });
};

module.exports = { validate, signUpValidator, changeUserStatus };
