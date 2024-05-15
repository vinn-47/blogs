const redisClient = require('./redisClient')

(async () => {
  try {
    await redisClient.set('test_key', 'test_value')
    const value = await redisClient.get('test_key')
    console.log('Value from Redis:', value); // Should print 'test_value'
    redisClient.quit()
  } catch (err) {
    console.error('Redis test error:', err)
  }
})()
