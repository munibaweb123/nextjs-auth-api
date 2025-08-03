import User from '@/app/models/userModels';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

type EmailType = 'VERIFY' | 'RESET';

interface SendEmailParams {
  email: string;
  emailType: EmailType;
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
  try {
    const hashToken = await bcryptjs.hash(userId.toString(), 10);
    const expiryTime = Date.now() + 3600000; // 1 hour

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashToken,
        verifyTokenExpiry: expiryTime,
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashToken,
        forgotPasswordTokenExpiry: expiryTime,
      });
    }

    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER || '5dcfdb85683e7f',
        pass: process.env.MAILTRAP_PASS || '351c5a0bcb9ec6',
      },
    });

    const subject =
      emailType === 'VERIFY' ? 'Verify your account' : 'Reset your password';

    const actionPath =
      emailType === 'VERIFY' ? 'verifyemail' : 'resetPassword';

    const mailOptions = {
      from: 'muni@gmail.com',
      to: email,
      subject: subject,
      html: `
        <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}.</p>
        <p>Or copy and paste the link below in your browser:</p>
        <p>${process.env.DOMAIN}/${actionPath}?token=${hashToken}</p>
      `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (err) {
    console.error('Error sending email:', err);
    throw new Error('Email sending failed');
  }
};
