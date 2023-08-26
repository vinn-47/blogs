import { logoutUser, loginUser } from '../reducers/userReducer'
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, Navigate, useParams, useNavigate, useMatch } from "react-router-dom"
import Signup from "./Signup"

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  
  const navigate = useNavigate()
  const redirect = () => {
    navigate("/")
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.Username.value
    const password = event.target.Password.value
    dispatch(loginUser({username, password}))
    redirect()
  };

  const loginForm = () => (
    <form class="flex flex-row text-black" onSubmit={handleLogin}>
      <div class="flex flex-col my-2">
        <input type="text" name="Username" placeholder="username" class="border-b-2 border-black" />
        <input type="password" name="Password" placeholder="password" />
      </div>
      <button type="submit" className="button-nav-bar my-1 mx-1 text-white">login</button>
    </form>
  )

  
  if (user === null) {
    return (
      <div class="flex flex-row text-white mx-2 items-center">
        {loginForm()}
        <Link to="/signup" className="button-nav-bar">signup</Link>
      </div>
    )
  }

  //const navigate = useNavigate()

  const handleLogout = async (event) => {
    event.preventDefault();
    dispatch(logoutUser());
    //navigate("/")
  };

  if(user === null) {
    user = useSelector(state => state.user)
  }

  const padding = {
    padding: 5
  }

  return (
    <div class="text-white mx-2">
      <p><Link to={`/users/${user.username}`}>{user.name}</Link> logged in</p>
      <button onClick={handleLogout} className="button-nav-bar">logout</button>
    </div>
  )
}

export default Login