import dotenv from 'dotenv';
import app from './app.js';
import dbConnect from './config/db.js';
import redisClient from './config/redis.js';

dotenv.config();

const PORT = process.env.PORT;

const server = async () => {
  try {
    await dbConnect();

    await redisClient.connect();

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.log('Server startup failed:', error.message);

    process.exit(1);
  }
};

server();
