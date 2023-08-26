import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    increaseLikes(state, action) {
      const id = action.payload.id
      const blogToUpdate = state.find((b) => b.id === id)
      const updatedBlog = { ...blogToUpdate, likes: action.payload.likes }

      return state.map(blog =>
        blog.id !== id ? blog : updatedBlog  
      )
    },
    addNewComment(state, action) {
      const id = action.payload.id
      const blogToUpdate = state.find((b) => b.id === id)
      const updatedBlog = { ...blogToUpdate, comments: action.payload.comments }

      return state.map(blog =>
        blog.id !== id ? blog : updatedBlog  
      )
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      const id = action.payload
      const blogToDelete = state.find((blog) => blog.id === id);
      return state.filter((blog) => blog.id !== blogToDelete.id)
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blogId) => {
  return async dispatch => {
    const updatedBlog = await blogService.like(blogId)
    dispatch(increaseLikes(updatedBlog))
  }
}

export const addComment = (commentObj) => {
  return async dispatch => {
    const res = await blogService.comment(commentObj.id, commentObj.text)
    dispatch(addNewComment(res))
  }
}

export const deleteBlog = (blogId) => {
  return async dispatch => {
    blogService.remove(blogId)
    dispatch(removeBlog(blogId))
  }
}

export const { increaseLikes, appendBlog, setBlogs, removeBlog, addNewComment } = blogSlice.actions

export default blogSlice.reducer