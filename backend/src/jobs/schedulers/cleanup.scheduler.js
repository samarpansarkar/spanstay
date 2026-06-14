import { addCleanupJob } from '../services/cleanup-job.service.js';
import { CLEANUP_JOB_TYPES } from '../constants/job.constants.js';

/**
 * Initializes repeatable BullMQ jobs.
 * This should only be called once when the worker process starts.
 */
export const startCleanupSchedulers = async () => {
  console.log('Initializing Cleanup Schedulers...');

  // Run every night at midnight (Cron: 0 0 * * *)
  const dailyOptions = {
    repeat: { pattern: '0 0 * * *' },
    jobId: 'daily-cleanup-job', // ensures we don't duplicate
  };

  await addCleanupJob(CLEANUP_JOB_TYPES.DELETE_EXPIRED_OTPS, {}, dailyOptions);
  await addCleanupJob(CLEANUP_JOB_TYPES.DELETE_EXPIRED_TOKENS, {}, dailyOptions);
  
  // Run every Sunday at 3 AM (Cron: 0 3 * * 0)
  const weeklyOptions = {
    repeat: { pattern: '0 3 * * 0' },
    jobId: 'weekly-cleanup-job',
  };

  await addCleanupJob(CLEANUP_JOB_TYPES.DELETE_OLD_NOTIFICATIONS, {}, weeklyOptions);
  await addCleanupJob(CLEANUP_JOB_TYPES.DELETE_OLD_AUDIT_LOGS, {}, weeklyOptions);
  await addCleanupJob(CLEANUP_JOB_TYPES.DELETE_INACTIVE_ACCOUNTS, {}, weeklyOptions);

  console.log('Cleanup Schedulers Initialized');
};
