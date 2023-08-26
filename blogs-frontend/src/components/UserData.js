import { setAllUsers } from "../reducers/usersReducer"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useMatch } from "react-router-dom"

import Blogs from "./Blogs"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"

const UserData = () => {
  const match = useMatch('/users/:username')

  const username = match ? match.params.username : null
  
  const currentUser = useSelector(state => state.users.find(user => user.username === username))

  if(!currentUser) {
    return null
  }
  
  const loggedInUser = useSelector(state => state.user)

  return (
    <div>
      <h1 class="mx-2 text-4xl">{currentUser.name}'s profile</h1>
      <br />
      {
        currentUser.username === loggedInUser.username &&
        <Togglable buttonLabel="new blog">
          <BlogForm />
        </Togglable>
      }
      <Blogs userFilter={currentUser} />
    </div>
  )
}

export default UserData