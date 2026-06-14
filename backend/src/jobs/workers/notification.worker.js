import { Worker } from 'bullmq';
import { connection } from '../config/bullmq.js';
import { QUEUES } from '../constants/job.constants.js';
import { createNotificationService } from '../../modules/notification/notification.service.js';

const processNotificationJob = async (job) => {
  console.log(`Processing Notification Job [${job.id}]: ${job.name}`);
  
  // The job.data should conform to the required Notification payload
  const { userId, type, title, message, channel, metadata } = job.data;
  
  if (!userId || !type || !title || !message) {
    throw new Error('Missing required notification fields in job data');
  }

  await createNotificationService({
    userId,
    type,
    title,
    message,
    channel: channel || 'IN_APP',
    metadata: metadata || {},
  });
};

export const notificationWorker = new Worker(QUEUES.NOTIFICATION, processNotificationJob, {
  connection,
  concurrency: 10, // Higher concurrency since notifications are fast DB writes
});

notificationWorker.on('completed', (job) => {
  console.log(`Notification Job [${job.id}] completed successfully`);
});

notificationWorker.on('failed', (job, err) => {
  console.error(`Notification Job [${job.id}] failed with error: ${err.message}`);
});
