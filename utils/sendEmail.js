const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

// const data = {
//   to: "vlad559@yahoo.com",
//   subject: "Sending with Twilio SendGrid is Fun",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>"
// };

const sendEmail = async (data) => {
  const email = { ...data, from: "khv23@meta.ua" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;