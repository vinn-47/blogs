import { createSlice } from '@reduxjs/toolkit'

import usersService from '../services/users'
import signupService from "../services/signup"
import { setNotification } from "../reducers/notificationReducer"

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    addNewUser(state, action) {
      state.push(action.payload)
    }
  }
})

export const setAllUsers = () => {
  return async dispatch => {
      const users = await usersService.getAll()
      dispatch(setUsers(users))
  }
}

export const signupUser = (creds) => {
  return async dispatch => {
    try {
      const user = await signupService.signup(creds)
      dispatch(addNewUser(user))
    } catch (exception) {
      const errorNotification = {
        message: "Username already taken!",
        isError: true,
      };
      dispatch(setNotification(errorNotification));
      setTimeout(() => {
        dispatch(setNotification(null));
      }, 5000);

    }
  }
}

export const { setUsers, addNewUser } = usersSlice.actions

export default usersSlice.reducer