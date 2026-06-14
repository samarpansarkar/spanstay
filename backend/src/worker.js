import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { startWorkers } from './jobs/index.js';

dotenv.config();

// We need a DB connection for workers to fetch/update data
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Worker DB Connected');
    await startWorkers();
  } catch (error) {
    console.error('Failed to start worker process:', error);
    process.exit(1);
  }
};

start();
