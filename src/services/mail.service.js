const nodeMailer = require('nodemailer');

exports.sendEmail = async (email, subject, message) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject,
      html: message,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(error);
  }
};
