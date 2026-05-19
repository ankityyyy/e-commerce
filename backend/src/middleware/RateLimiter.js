import redisClient from "../redis/redis.js"

const rateLimiter = (limit, windowSec, prefix) => {
  return async (req, res, next) => {
    try {
      const userId = req.user?._id ||req.ip;

      const key = `rate:${prefix}:${userId}`;

      const requests = await redisClient.incr(key);

      if (requests === 1) {
        await redisClient.expire(key, windowSec);
      }

      if (requests > limit) {
        console.log(`Too many ${prefix} requests. Try again later.`)
        return res.status(429).json({
          message: `Too many ${prefix} requests. Try again later.`
        });
      }
    

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default rateLimiter;