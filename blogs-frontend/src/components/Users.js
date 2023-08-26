import { setAllUsers } from "../reducers/usersReducer"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, Navigate, useParams, useNavigate, useMatch } from "react-router-dom"

const Users = () => {  
  const users = useSelector(state => state.users)

  return (
    <table className="users-table">
      <tbody>
      <tr>
        <th class="border-r-2 border-black">User</th>
        <th>Blogs created</th>
      </tr>
      {users.map((user) => (
        <tr class="border-2 border-black">
          <td class="border-r-2 border-black"><Link to={`/users/${user.username}`}>{user.name}</Link></td>
          <td class="">{user.blogs.length}</td>
        </tr>
        
      ))}
      </tbody>
    </table>
  )
}

export default Users