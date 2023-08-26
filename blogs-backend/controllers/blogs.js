const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = request.user
    const blog = new Blog({
      title: body.title,
      author: body.author,
      text: body.text,
      likes: [],
      comments: [],
      user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    const returnedBlog = { ...savedBlog._doc,
      id: savedBlog.id,
      user: {
      "id": user.id, "name": user.name, "username": user.username 
    } }
  
    response.status(201).json(returnedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if(blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  response.status(404).json({ error: 'invalid user' })
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    text: body.text,
    likes: body.likes ? body.likes : []
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
})

// like blog
blogsRouter.post('/:id/like', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = request.user

  await Blog.findByIdAndUpdate(
    request.params.id,
    {$push: {likes: user.id}},
    {safe: true, upsert: true, new : true},
  ).then(updatedBlog => {
    response.json(updatedBlog)
  })
})

// add comments
blogsRouter.post('/:id/comment', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = request.user
  const comment = {
    text: request.body.text,
    userInfo: {
      id: user.id,
      username: user.username,
      name: user.name
    }
  }

  await Blog.findByIdAndUpdate(
    request.params.id,
    {$push: {comments: comment}},
    {safe: true, upsert: true, new : true},
  ).then(updatedBlog => {
    response.json(updatedBlog)
  })
})

module.exports = blogsRouter