const dotenv = require('dotenv').config().parsed;
if (dotenv) {
  module.exports = {
    port: dotenv.PORT,
    jwtSecret: dotenv.JWT_SECRET,
    emailSendFrom: dotenv.MAIL_SEND_FROM,
    mailSendPassword: dotenv.MAIL_SEND_PASSWORD,
    mailSendUsername: dotenv.MAIL_SEND_USERNAME,
    resetTokenKey: dotenv.RESET_TOKEN_KEY,
  };
} else {
  throw new Error('.env file is missing');
}
