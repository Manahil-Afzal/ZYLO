import { Redis } from "ioredis";

const redisClient = () => {
    const redisUrl = process.env.REDIS_URL;

    if (redisUrl) {
        return redisUrl;
    }

    throw new Error("Redis connection failed: REDIS_URL is missing");
};

const connectionUrl = redisClient();
const parsedRedisUrl = new URL(connectionUrl);
const isUpstash = parsedRedisUrl.hostname.includes("upstash.io");

export const redis = new Redis(connectionUrl, {
    maxRetriesPerRequest: null,
    connectTimeout: 10000,
    retryStrategy: (attempts: number) => Math.min(attempts * 200, 2000),
    ...(isUpstash ? { tls: {} } : {}),
});

redis.on("connect", () => {
    console.log("Redis connected");
});

redis.on("ready", () => {
    console.log("Redis ready");
});

redis.on("reconnecting", () => {
    console.warn("Redis reconnecting...");
});

redis.on("error", (error) => {
    console.error("Redis error:", error.message);
});

redis.on("end", () => {
    console.warn("Redis connection closed");
});
