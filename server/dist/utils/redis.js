"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = require("ioredis");
require('dotenv').config();
const redisClient = () => {
    const redisUrl = process.env.REDIS_URL;
    if (redisUrl) {
        return redisUrl;
    }
    throw new Error('Redis connection failed: REDIS_URL is missing');
};
const connectionUrl = redisClient();
const parsedRedisUrl = new URL(connectionUrl);
const isUpstash = parsedRedisUrl.hostname.includes('upstash.io');
exports.redis = new ioredis_1.Redis(connectionUrl, {
    maxRetriesPerRequest: null,
    connectTimeout: 10000,
    retryStrategy: (attempts) => Math.min(attempts * 200, 2000),
    ...(isUpstash ? { tls: {} } : {}),
});
exports.redis.on('connect', () => {
    console.log('Redis connected');
});
exports.redis.on('ready', () => {
    console.log('Redis ready');
});
exports.redis.on('reconnecting', () => {
    console.warn('Redis reconnecting...');
});
exports.redis.on('error', (error) => {
    console.error('Redis error:', error.message);
});
exports.redis.on('end', () => {
    console.warn('Redis connection closed');
});
