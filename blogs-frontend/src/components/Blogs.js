import { useState } from "react";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { Routes, Route, Link, Navigate, useParams, useNavigate, useMatch } from "react-router-dom"

const Blog = ({ blog, currentUser }) => {
  const [expand, setExpand] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const showDetails = { display: expand ? "" : "none" };
  // const showDelete = {
  //   display: blog.user && blog.user.id === currentUser.id ? "" : "none",
  // };
  const toggleExpand = () => {
    setExpand(!expand);
  };

  // const toggleLikes = () => {
  //   dispatch(likeBlog(blog))
  //   .catch((error) => {
  //           const errorNotification = {
  //           message: "Invalid credentials!",
  //           isError: true,
  //           };

  //         dispatch(setNotification(errorNotification));
  //         setTimeout(() => {
  //                   dispatch(setNotification(null));
  //                   }, 5000);
  //   });
  // }

  // const handleDelete = () => {
  //   if (window.confirm(`Delete ${blog.title}?`)) {
  //     dispatch(deleteBlog(blog.id))
  //         .catch((error) => {
  //          const errorNotification = {
  //            message: "The blog was already removed from the server!",
  //            isError: true,
  //          };
  //          dispatch(setNotification(errorNotification));
  //          setTimeout(() => {
  //            dispatch(setNotification(null));
  //          }, 5000);
  //        });
  //    }
  // }

  return (
    <div className="blog-list-item">
      <div class="flex flex-row justify-between items-center">
        <Link to={`/blogs/${blog.id}`} class="font-bold text-xl mx-2">{blog.title}</Link>
        <div class="italic">Likes {blog.likes.length}</div>
        <button onClick={toggleExpand} class="button-generic my-2">expand</button>
      </div>
      <div style={showDetails}>
        <p class="italic mx-2">- {blog.author}</p><br />
        <p class="line-clamp-2 mx-2">{blog.text}</p>
        <p>
          {/* {blog.likes.length} <button onClick={toggleLikes}>like</button> */}
        </p>
        {/* <div style={showDelete}>
          <button onClick={handleDelete}>remove</button>
        </div> */}
      </div>
    </div>
  );
};

const Blogs = ({ userFilter }) => {
  const user = useSelector(state => state.user)

  const blogs = userFilter 
    ? useSelector(state =>state.blogs.filter(blog => blog.user.id === userFilter.id))
    : useSelector(state => state.blogs)
  
  return (
    <ul className="blog-list">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          currentUser={user}
        />
      ))}
    </ul>
  )
}

export default Blogs
