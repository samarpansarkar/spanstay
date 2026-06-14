import IORedis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

// BullMQ requires maxRetriesPerRequest: null
// We create a dedicated Redis connection for the queues to prevent interference with standard caching
export const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

connection.on('error', (error) => {
  console.error('BullMQ Redis Connection Error:', error);
});

export const defaultQueueOptions = {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: {
      age: 3600, // keep up to 1 hour
      count: 1000, // keep up to 1000 jobs
    },
    removeOnFail: {
      age: 24 * 3600, // keep up to 24 hours
    },
  },
};
