import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {setNotification} from "./reducers/notificationReducer";
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

import Togglable from './components/Togglable'
import {getAllBlogs} from "./reducers/blogReducer";
import {setUser} from './reducers/userReducer'
const App = (props) => {

  useEffect(() => {
    props.getAllBlogs()
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      props.setUser(loggedUser)
      blogService.setToken(loggedUser.token)

    }
  }, [])


  const handleLogout = () => {
    window.localStorage.removeItem(
      'loggedUser'
    )
    props.setUser(null)
  }

  return (
    <div>
      <Notification/>
      {props.user === null ? <LoginForm/> :
        <div>
          <p>{props.user.name} logged in
            <button onClick={() => handleLogout()}>
                logout
            </button>
          </p>
          <Togglable buttonLabel='new blog'>
            <BlogForm />
          </Togglable>
          <BlogList/>
        </div>
      }
    </div>
  )
}

const mapDispatchToProps = {
  setNotification, getAllBlogs, setUser
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
