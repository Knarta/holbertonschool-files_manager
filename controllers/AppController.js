import redisClient from '../utils/redis.mjs';

export function getStatus(req, res) {
  const resRedis = redisClient.isAlive();
  res.status(200).json({ redis: resRedis, db: true });
}

export function getStats(req, res) {
  res.status(200).json({ bob: true });
}
