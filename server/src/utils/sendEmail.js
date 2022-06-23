const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendEmail(toEmail, subject, payload) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `Recipe Manager <${process.env.EMAIL_USERNAME}>`,
      to: toEmail,
      subject: subject,
      html: `<h1>${payload.heading}</h1><br><p>${payload.text || ""}</p>`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(`Email error to: ${mailOptions.to} =>`, error);
      }
    });
  } catch (error) {
    console.log(`Error with sending email to: ${toEmail} =>`, error);
  }
}

module.exports = { sendEmail };
