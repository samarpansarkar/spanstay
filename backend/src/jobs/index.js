import { emailWorker } from './workers/email.worker.js';
import { notificationWorker } from './workers/notification.worker.js';
import { cleanupWorker } from './workers/cleanup.worker.js';
import { startCleanupSchedulers } from './schedulers/cleanup.scheduler.js';

export const startWorkers = async () => {
  console.log('Starting Background Job Workers...');
  
  // Starting schedulers
  await startCleanupSchedulers();

  // Workers are automatically started when instantiated, but we can manage graceful shutdowns here
  const shutdown = async () => {
    console.log('Shutting down workers gracefully...');
    await Promise.all([
      emailWorker.close(),
      notificationWorker.close(),
      cleanupWorker.close(),
    ]);
    console.log('Workers shutdown complete');
    process.exit(0);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};
