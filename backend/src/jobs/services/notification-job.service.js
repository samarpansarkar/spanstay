import { notificationQueue } from '../queues/notification.queue.js';
import { NOTIFICATION_JOB_TYPES } from '../constants/job.constants.js';

export const addNotificationJob = async (type, payload, options = {}) => {
  if (!Object.values(NOTIFICATION_JOB_TYPES).includes(type)) {
    throw new Error(`Invalid Notification Job Type: ${type}`);
  }

  return await notificationQueue.add(type, payload, options);
};
