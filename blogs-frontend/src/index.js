import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from "./App"
import "./index.css"

import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"
import userReducer from "./reducers/userReducer"
import usersReducer from "./reducers/usersReducer"

import { BrowserRouter as Router } from "react-router-dom"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer
  }
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)
