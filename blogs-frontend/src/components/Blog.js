import { useDispatch, useSelector } from "react-redux"
import { useMatch, useNavigate } from "react-router-dom"

import { likeBlog, deleteBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"

import Comments from "./Comments"

const Blog = () => {
  const dispatch = useDispatch()
  const match = useMatch('/blogs/:id')
  
  const blog = match
    ? useSelector(state => state.blogs.find(blog => blog.id === match.params.id))
    : null

  if(!blog) {
    return null
  }

  const user = useSelector(state => state.user)

  const navigate = useNavigate()

  const showDelete = {
    display: user && blog.user && blog.user.id === user.id ? "" : "none",
  }

  const toggleLikes = () => {
    dispatch(likeBlog(blog.id))
    .catch((error) => {
            const errorNotification = {
            message: "Please sign in to like!",
            isError: true,
            };

          dispatch(setNotification(errorNotification));
          setTimeout(() => {
                    dispatch(setNotification(null));
                    }, 5000)
    })
  }

  const handleDelete = () => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      dispatch(deleteBlog(blog.id))
          .catch((error) => {
           const errorNotification = {
             message: "The blog was already removed from the server!",
             isError: true,
           }
           dispatch(setNotification(errorNotification));
           setTimeout(() => {
             dispatch(setNotification(null));
           }, 5000)
         })
      navigate("/")
    }
  }

  return (
    <div class="flex flex-col mx-2 my-2">
      <div class="text-2xl">{blog.title}</div>
      <div class="italic">- {blog.author}</div>
      <div class="border-l-2 border-r-2 border-black my-4">
        <p class="mx-2">{blog.text}</p>
      </div>
      <div class="flex flex-row justify-between">
      <p class="mx-2 italic">
        {blog.likes.length} <button onClick={toggleLikes} className="button-generic">like</button>
      </p>
      <div style={showDelete}>
        <button onClick={handleDelete} className="button-generic">remove</button>
      </div>
      </div>
      <div class="my-4 border-2 border-black">
      <Comments id={blog.id} comments={blog.comments} />
      </div>
    </div>
  )
}

export default Blog