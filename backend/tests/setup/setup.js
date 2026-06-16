import { jest } from '@jest/globals';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import 'dotenv/config';

import redisClient from '../../src/config/redis.js';

let mongoServer;

// Set mock environment variables
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_mock_secret';
process.env.STRIPE_SECRET_KEY = 'sk_test_mock_secret';

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  
  await mongoose.connect(mongoUri);

  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
  if (redisClient.isOpen) {
    await redisClient.disconnect();
  }
});

afterEach(async () => {
  // Clear all collections after each test if connected
  if (mongoose.connection.readyState === 1) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
});

// Remove broken jest.mock for redis.js

// Mock BullMQ globally
jest.mock('bullmq', () => ({
  Queue: jest.fn().mockImplementation(() => ({
    add: jest.fn().mockResolvedValue({ id: 'mock-job-id' }),
  })),
  Worker: jest.fn().mockImplementation(() => ({
    on: jest.fn(),
  })),
}));

// Mock Bull Board
jest.mock('@bull-board/api', () => ({
  createBullBoard: jest.fn(),
}));

jest.mock('@bull-board/api/bullMQAdapter', () => ({
  BullMQAdapter: jest.fn(),
}));

// Mock Cloudinary globally
jest.mock('cloudinary', () => ({
  v2: {
    config: jest.fn(),
    uploader: {
      upload: jest.fn().mockResolvedValue({ secure_url: 'mock-url', public_id: 'mock-id' }),
      destroy: jest.fn().mockResolvedValue({ result: 'ok' }),
    },
  },
}));
// End of mock
