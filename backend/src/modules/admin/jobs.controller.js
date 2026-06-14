import asyncHandler from '../../shared/utils/asyncHandler.js';
import sendResponse from '../../shared/utils/SendResponse.js';
import { emailQueue } from '../../jobs/queues/email.queue.js';
import { notificationQueue } from '../../jobs/queues/notification.queue.js';
import { cleanupQueue } from '../../jobs/queues/cleanup.queue.js';

const getQueueStats = async (queue) => {
  const [waiting, active, completed, failed, delayed] = await Promise.all([
    queue.getWaitingCount(),
    queue.getActiveCount(),
    queue.getCompletedCount(),
    queue.getFailedCount(),
    queue.getDelayedCount(),
  ]);

  return { waiting, active, completed, failed, delayed };
};

export const getJobsStatsController = asyncHandler(async (req, res) => {
  const [emailStats, notificationStats, cleanupStats] = await Promise.all([
    getQueueStats(emailQueue),
    getQueueStats(notificationQueue),
    getQueueStats(cleanupQueue),
  ]);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job statistics fetched successfully',
    data: {
      emailQueue: emailStats,
      notificationQueue: notificationStats,
      cleanupQueue: cleanupStats,
    },
  });
});

export const getJobsQueuesController = asyncHandler(async (req, res) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job queues fetched successfully',
    data: [
      emailQueue.name,
      notificationQueue.name,
      cleanupQueue.name,
    ],
  });
});

export const getFailedJobsController = asyncHandler(async (req, res) => {
  const [emailFailed, notifFailed, cleanupFailed] = await Promise.all([
    emailQueue.getFailed(),
    notificationQueue.getFailed(),
    cleanupQueue.getFailed(),
  ]);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Failed jobs fetched successfully',
    data: [...emailFailed, ...notifFailed, ...cleanupFailed],
  });
});

export const getCompletedJobsController = asyncHandler(async (req, res) => {
  const [emailCompleted, notifCompleted, cleanupCompleted] = await Promise.all([
    emailQueue.getCompleted(),
    notificationQueue.getCompleted(),
    cleanupQueue.getCompleted(),
  ]);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Completed jobs fetched successfully',
    data: [...emailCompleted, ...notifCompleted, ...cleanupCompleted],
  });
});

export const getWaitingJobsController = asyncHandler(async (req, res) => {
  const [emailWaiting, notifWaiting, cleanupWaiting] = await Promise.all([
    emailQueue.getWaiting(),
    notificationQueue.getWaiting(),
    cleanupQueue.getWaiting(),
  ]);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Waiting jobs fetched successfully',
    data: [...emailWaiting, ...notifWaiting, ...cleanupWaiting],
  });
});
