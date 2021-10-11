/*eslint-disable */
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  emailSendFrom: process.env.MAIL_SEND_FROM,
  mailSendPassword: process.env.MAIL_SEND_PASSWORD,
  mailSendUsername: process.env.MAIL_SEND_USERNAME,
  resetTokenKey: process.env.RESET_TOKEN_KEY,
};
