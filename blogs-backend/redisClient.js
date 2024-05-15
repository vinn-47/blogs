const Redis = require('ioredis')

const redisClient = new Redis({
  host: '127.0.0.1',
  port: 6379,
  maxRetriesPerRequest: null // This is required by BullMQ
})

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err)
})

module.exports = redisClient
