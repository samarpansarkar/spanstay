import { Worker } from 'bullmq';
import { connection } from '../config/bullmq.js';
import { QUEUES, EMAIL_JOB_TYPES } from '../constants/job.constants.js';
import { sendEmail } from '../../modules/email/email.service.js';
import { otpTemplate } from '../../modules/email/templetes/otp.templete.js';
import { resetPasswordTemplate } from '../../modules/email/templetes/resetPassword.templete.js';

const processEmailJob = async (job) => {
  const { type, data } = job;
  console.log(`Processing Email Job [${job.id}]: ${job.name}`);

  switch (job.name) {
    case EMAIL_JOB_TYPES.EMAIL_VERIFICATION:
      await sendEmail({
        to: data.email,
        subject: 'Verify your SpanStay Account',
        html: otpTemplate(data.otp, data.name),
      });
      break;

    case EMAIL_JOB_TYPES.FORGOT_PASSWORD:
      await sendEmail({
        to: data.email,
        subject: 'Your Password Reset Token (valid for 15 min)',
        html: resetPasswordTemplate(data.resetUrl, data.name),
      });
      break;

    case EMAIL_JOB_TYPES.TEST_EMAIL:
      await sendEmail({
        to: data.to,
        subject: data.subject,
        html: data.html,
      });
      break;

    case EMAIL_JOB_TYPES.PASSWORD_CHANGED:
      await sendEmail({
        to: data.email,
        subject: 'Password Changed Successfully',
        html: `<p>Your SpanStay account password was recently changed. If this wasn't you, please contact support immediately.</p>`,
      });
      break;

    case EMAIL_JOB_TYPES.BOOKING_CONFIRMATION:
      await sendEmail({
        to: data.email,
        subject: 'Booking Confirmed - SpanStay',
        html: `<p>Your booking at <strong>${data.hotelName}</strong> has been confirmed! Your booking ID is: ${data.bookingId}.</p>`,
      });
      break;

    case EMAIL_JOB_TYPES.HOTEL_APPROVAL:
      await sendEmail({
        to: data.email,
        subject: 'Hotel Approved - SpanStay',
        html: `<p>Congratulations! Your hotel <strong>${data.hotelName}</strong> has been approved and is now live on SpanStay.</p>`,
      });
      break;

    case EMAIL_JOB_TYPES.HOTEL_REJECTION:
      await sendEmail({
        to: data.email,
        subject: 'Hotel Application Update - SpanStay',
        html: `<p>We regret to inform you that your hotel application for <strong>${data.hotelName}</strong> was rejected. Please contact support for more details.</p>`,
      });
      break;

    case EMAIL_JOB_TYPES.SUPPORT_TICKET_UPDATE:
      await sendEmail({
        to: data.email,
        subject: `Update on Support Ticket #${data.ticketId}`,
        html: `<p>There is a new update on your support ticket regarding: ${data.subject}. Please log in to view the details.</p>`,
      });
      break;

    default:
      console.warn(`Unknown email job type: ${job.name}`);
      throw new Error(`Unknown email job type: ${job.name}`);
  }
};

export const emailWorker = new Worker(QUEUES.EMAIL, processEmailJob, {
  connection,
  concurrency: 5, // Process up to 5 emails concurrently
});

emailWorker.on('completed', (job) => {
  console.log(`Email Job [${job.id}] completed successfully`);
});

emailWorker.on('failed', (job, err) => {
  console.error(`Email Job [${job.id}] failed with error: ${err.message}`);
});
