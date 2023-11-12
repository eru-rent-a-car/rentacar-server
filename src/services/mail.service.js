const nodeMailer = require('nodemailer');
require('dotenv').config();

exports.chooseMailTemplate = (user, token, type) => {
  const mailTemplate = {
    resetPassword: {
      subject: 'Reset Password',
      html: `
      <div>
        <h3>Hi ${user.firstName},</h3>
        <p>
          You are receiving this email because you (or someone else) has requested the reset of the password for your account.
        </p>
        <p>
          Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:
        </p>
        <a href="${process.env.CLIENT_URL}/reset-password/${token}">Reset Password</a>
        <p>
          If you did not request this, please ignore this email and your password will remain unchanged.
        </p>
        <p>
          Thanks,
        </p>
        <p>
          Your company name
        </p>
      </div>
    `,
    },
    verifyEmail: {
      subject: 'Verify Email',
      html: `
      <div>
        <h3>Hi ${user.firstName},</h3>
        <p>
          You are receiving this email because you (or someone else) has requested the verification of your email for your account.
        </p>
        <p>
          Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:
        </p>
        <a href="${process.env.CLIENT_URL}/verify-email/${token}">Verify Email</a>
        <p>
          If you did not request this, please ignore this email and your email will remain unverified.
        </p>
        <p>
          Thanks,
        </p>
        <p>
          Your company name
        </p>
      </div>
    `,
    },
  };
  return mailTemplate[type];
};

exports.sendEmail = async (email, content) => {
  console.log(content);
  try {
    const transporter = nodeMailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      ...content,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(error);
  }
};
