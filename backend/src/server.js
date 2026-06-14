import 'dotenv/config';
import app from './app.js';
import dbConnect from './config/db.js';
import redisClient from './config/redis.js';
import { startWorkers } from './jobs/index.js';

const PORT = process.env.PORT;

const server = async () => {
  try {
    await dbConnect();

    await redisClient.connect();

    // Start background job workers and schedulers
    await startWorkers();

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.log('Server startup failed:', error.message);

    process.exit(1);
  }
};

server();
