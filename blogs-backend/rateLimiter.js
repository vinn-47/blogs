const Redis = require('ioredis')
const redisClient = new Redis({
  host: '127.0.0.1',
  port: 6379,
})

function rateLimiter(req, res, next) {
  const ipAddress = req.ip; // Get client IP address
  const key = `rate-limit:${ipAddress}`
  const limit = 100 // Maximum requests allowed
  const expiration = 15 * 60 // Expiration time in seconds

  // Check if the key exists in Redis
  redisClient.exists(key, (err, exists) => {
    if (err) {
      console.error('Redis Error:', err)
      return res.status(500).json({ message: 'Internal Server Error' })
    }

    if (exists) {
      // Key exists, increment the counter
      redisClient.incr(key, (err, count) => {
        if (err) {
          console.error('Redis Error:', err)
          return res.status(500).json({ message: 'Internal Server Error' })
        }
        if (count > limit) {
          // Limit exceeded, send 429 Too Many Requests
          return res.status(429).json({ message: 'Too many requests, please try again later.' })
        }
        next() // Proceed to the next middleware
      })
    } else {
      // Key doesn't exist, set initial count and expiration
      redisClient.setex(key, expiration, 1, (err) => {
        if (err) {
          console.error('Redis Error:', err)
          return res.status(500).json({ message: 'Internal Server Error' })
        }
        next() // Proceed to the next middleware
      })
    }
  })
}

module.exports = rateLimiter
