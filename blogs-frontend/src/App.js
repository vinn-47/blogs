import { useEffect } from "react"
import Blogs from "./components/Blogs"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Users from "./components/Users"
import UserData from "./components/UserData"
import { useDispatch, useSelector } from "react-redux"

import { initializeBlogs } from "./reducers/blogReducer"
import { initializeUser } from "./reducers/userReducer"
import { setAllUsers } from "./reducers/usersReducer"

import { Routes, Route, Link, Navigate, useParams, useNavigate, useMatch } from "react-router-dom"

import logo from './logo.png'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(setAllUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const user = useSelector(state => state.user)

  // use "user" instead of dispatch?
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const padding = {
    padding: 5
  }

  return (
    <div>
      <nav class="flex flex-row justify-between bg-black items-center">
        <img src={logo} alt="logo.png" class="h-10 max-w-full rounded-lg mx-2"></img>
        <ul className="nav-bar">
          <li className="button-nav-bar">
            <Link to="/">home</Link>
          </li>
          <li className="button-nav-bar ">
            <Link to="/users">users</Link>
          </li>
        </ul>
        <Login />
      </nav>
      <Notification />
      <Routes>
        <Route path="/users/:username" element={<UserData />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/" element={<Blogs user={null} />}/>
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {/* <footer valign="bottom">
        <em>W1NT3R</em>
      </footer> */}
    </div>
    
  );
};

export default App;
