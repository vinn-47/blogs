const { myQueue } = require('./bullmq')

(async () => {
  try {
    await myQueue.add('testJob', { blog: { id: '123', title: 'Test Blog' } })
    console.log('Job added to the queue')
  } catch (err) {
    console.error('BullMQ test error:', err)
  }
})()
