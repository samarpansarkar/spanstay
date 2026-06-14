import { cleanupQueue } from '../queues/cleanup.queue.js';
import { CLEANUP_JOB_TYPES } from '../constants/job.constants.js';

export const addCleanupJob = async (type, payload = {}, options = {}) => {
  if (!Object.values(CLEANUP_JOB_TYPES).includes(type)) {
    throw new Error(`Invalid Cleanup Job Type: ${type}`);
  }

  return await cleanupQueue.add(type, payload, options);
};
