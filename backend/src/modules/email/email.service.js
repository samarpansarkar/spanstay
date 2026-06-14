import { mailTransporter } from '../../config/email.js';

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await mailTransporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      text,
      html,
    });
    console.log(`[Email Service] Mail sent to ${to}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[Email Service] Failed to send mail to ${to}`, error);
    return { success: false, error: error.message };
  }
};
