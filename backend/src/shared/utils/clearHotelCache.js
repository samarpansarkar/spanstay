import redisClient from '../../config/redis.js';

const clearHotelCache = async () => {
  const keys = await redisClient.keys('hotels:');

  if (keys.length > 0) {
    await redisClient.del(keys);

    console.log('Hotel cache cleared!!');
  }
};

export default clearHotelCache;
