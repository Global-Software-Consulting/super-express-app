var nodemailer = require('nodemailer');
// var mandrillTransport = require('nodemailer-mandrill-transport');

const sendMail = async (mailOptions) => {
  let sendMailOptions = {
    ...mailOptions,
    from: process.env.MAIL_SEND_FROM,
    sender: process.env.MAIL_SEND_FROM,
  };

  var transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAIL_SEND_USERNAME,
      pass: process.env.MAIL_SEND_PASSWORD,
    },
  });
  try {
    const response = await transport.sendMail(sendMailOptions);
    console.log('after sending email');
    // return true; // TODO needed to remove once get paid email service
    console.log({ response });
    if (response.accepted.length > 0) {
      return true;
    } else return false;
  } catch (error) {
    // return true; // TODO needed to remove once get paid email service
    return false;
  }
};

module.exports = { sendMail };
