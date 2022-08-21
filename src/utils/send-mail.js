var nodemailer = require('nodemailer');
// var mandrillTransport = require('nodemailer-mandrill-transport');
const { config } = require('../config');
const sendMail = async (mailOptions) => {
  let sendMailOptions = {
    ...mailOptions,
    from: config.emailSendFrom,
    sender: config.emailSendFrom,
  };

  var transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: config.mailSendUsername,
      pass: config.mailSendPassword,
    },
  });
  try {
    const response = await transport.sendMail(sendMailOptions);
    // return true; // TODO needed to remove once get paid email service
    if (response.accepted.length > 0) {
      return true;
    } else return false;
  } catch (error) {
    // return true; // TODO needed to remove once get paid email service
    return false;
  }
};

module.exports = { sendMail };
