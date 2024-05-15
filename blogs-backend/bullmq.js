const { Queue, Worker } = require('bullmq')
const Redis = require('ioredis')

const connectionOptions = {
  host: '127.0.0.1',
  port: 6379,
  maxRetriesPerRequest: null // This is required by BullMQ
}

const myQueue = new Queue('blogQueue', {
  connection: new Redis(connectionOptions)
})

const worker = new Worker('blogQueue', async (job) => {
  const { blog } = job.data
  const redisClient = new Redis(connectionOptions)
  await redisClient.set(`blog:${blog.id}`, JSON.stringify(blog))
  redisClient.quit()
}, {
  connection: new Redis(connectionOptions)
})

worker.on('completed', (job) => {
  console.log(`Job completed with result ${job.returnvalue}`)
})

worker.on('failed', (job, err) => {
  console.error(`Job failed with error ${err}`)
})

module.exports = { myQueue }
