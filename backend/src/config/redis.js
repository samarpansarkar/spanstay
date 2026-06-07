import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => console.log('Redis Error.'));

redisClient.on('connect', () => console.log('Redis Connected!!'));

export default redisClient;
