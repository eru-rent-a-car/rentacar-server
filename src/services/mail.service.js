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
          Rent A Car
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
          Rent A Car
        </p>
      </div>
    `,
    },
  };
  return mailTemplate[type];
};

exports.sendEmail = async (email, content) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.SMPT_API_KEY,
        pass: process.env.SMPT_API_SECRET,
      },
    });
    const mailOptions = {
      from: 'oktay.parlak.12@hotmail.com',
      to: email,
      ...content,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(error);
  }
};
