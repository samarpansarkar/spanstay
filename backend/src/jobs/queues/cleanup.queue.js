import { Queue } from 'bullmq';
import { defaultQueueOptions } from '../config/bullmq.js';
import { QUEUES } from '../constants/job.constants.js';

export const cleanupQueue = new Queue(QUEUES.CLEANUP, defaultQueueOptions);
