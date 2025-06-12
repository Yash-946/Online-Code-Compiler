import Redis from 'ioredis';

const localRedis = new Redis("redis://localhost:6379");

// const upstashRedis = new Redis(process.env.UPSTASH_REDIS_URL, {
//   tls: true, // Ensure TLS is enabled for Upstash
//   family: 6, // Use IPv6 if required by your environment
// });

export { localRedis };
