const dotenv = require('dotenv').config().parsed;
if (dotenv) {
  module.exports = { port: dotenv.PORT, jwtSecret: dotenv.JWT_SECRET };
} else {
  throw new Error('.env file is missing');
}
