import redis from "../config/redisClient.js";

const cache = (keyPrefix, duration = 60) => {
  return async (req, res, next) => {
    const key = keyPrefix + req.originalUrl;

    const cachedData = await redis.get(key);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    // override res.json to store response
    res.sendResponse = res.json; 

    res.json = async (body) => {
      await redis.setex(key, duration, JSON.stringify(body));
      res.sendResponse(body);
    };

    next();
  };
};

export default cache;
