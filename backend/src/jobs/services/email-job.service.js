import { emailQueue } from '../queues/email.queue.js';
import { EMAIL_JOB_TYPES } from '../constants/job.constants.js';

/**
 * Adds an email job to the queue
 * @param {string} type - From EMAIL_JOB_TYPES
 * @param {Object} payload - The email payload (to, subject, html, text, etc)
 * @param {Object} options - BullMQ job options (priority, delay, etc)
 */
export const addEmailJob = async (type, payload, options = {}) => {
  if (!Object.values(EMAIL_JOB_TYPES).includes(type)) {
    throw new Error(`Invalid Email Job Type: ${type}`);
  }

  return await emailQueue.add(type, payload, options);
};
