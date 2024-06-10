import { RedisOptions } from 'ioredis';

export default {
  redis: {
    host: process.env.REDIS_HOSTNAME,
    port: parseInt(process.env.REDIS_PORT, 10),
  } as RedisOptions,
};
