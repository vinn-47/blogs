import { useDispatch, useSelector } from "react-redux"
import { signupUser } from "../reducers/usersReducer"
import { Routes, Route, Link, Navigate, useParams, useNavigate, useMatch } from "react-router-dom"

const Signup = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const redirect = () => {
    navigate("/")
  }

  const handleSignup = async (event) => {
    event.preventDefault();
    const name = event.target.Name.value
    const username = event.target.Username.value
    const password = event.target.Password.value

    event.target.Name.value = ''
    event.target.Username.value = ''
    event.target.Password.value = ''

    dispatch(signupUser({name, username, password}))
    redirect()
  };

  const signupForm = () => (
    <form onSubmit={handleSignup} class="flex flex-col m-2 p-2">
      <input type="text" name="Name" placeholder="name" class="border-2" />
      <input type="text" name="Username" placeholder="username" class="border-2" />
      <input type="password" name="Password" placeholder="password" class="border-2" />
      <button type="submit" class="button-generic my-2">signup</button>
    </form>
  )

  return (
    <div className="signup">
      <div class="text-3xl font-bold">New? Sign up</div>
      {signupForm()}
    </div>
  )
}

export default Signup