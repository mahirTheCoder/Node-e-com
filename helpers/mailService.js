const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "mahirthecoder.bd@gmail.com",
    pass: "acgg rmko tyze jshm",
  },
});


const mailSender = async ({ email, subject, template }) => {
  try {
    await transporter.sendMail({
      from: `"node_Ecom" <mahirthecoder.bd@gmail.com>`,
      to: email,
      subject: subject,
      html: template,
    });
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
};

module.exports = { mailSender };