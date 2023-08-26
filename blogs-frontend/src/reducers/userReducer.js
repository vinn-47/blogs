import { createSlice } from '@reduxjs/toolkit'
import blogService from "../services/blogs"
import loginService from "../services/login"
import { setNotification } from "../reducers/notificationReducer"

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initUser(state, action) {
      const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)
        return user
      }
      return null
    },
    login(state, action) {
      const user = action.payload
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      return user
    },
    logout(state, action) {
      window.localStorage.removeItem("loggedBlogAppUser");
      return null
    }
  }
})

export const { initUser, login, logout } = userSlice.actions

export const initializeUser = () => {
  return async dispatch => {
    dispatch(initUser())
  }
}

export const logoutUser = () => {
  return async dispatch => {
    dispatch(logout())
  }
}

export const loginUser = ({ username, password }) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      dispatch(login(user))
    } catch (exception) {
      const errorNotification = {
        message: "Invalid credentials!",
        isError: true,
      };
      dispatch(setNotification(errorNotification));
      setTimeout(() => {
        dispatch(setNotification(null));
      }, 5000);

    }
  }
}

export default userSlice.reducer