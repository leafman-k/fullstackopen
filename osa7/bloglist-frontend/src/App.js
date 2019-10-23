import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {setNotification} from "./reducers/notificationReducer";
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

import {getAllBlogs} from "./reducers/blogReducer";
import {setUser} from './reducers/loginReducer'

import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import UserList from "./components/UserList"
import BlogList from "./components/BlogList"
import User from './components/User'
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
const App = (props) => {

  useEffect(() => {
    props.getAllBlogs()
  }, [])

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
  const userById = (id) => {
    console.log("user id: ", id)
    return props.users.find(user => user.id === id)
  }

  return (
      <div>
        <h2>Blogs</h2>
        <Notification/>
        {props.loggedUser !== null ?
            <div>
              <p>{props.loggedUser.name} logged in</p>
                <button onClick={() => handleLogout()}>
                  logout
                </button>
            </div>:<></>
        }
        <Router>
          <div>
            <Route exact path="/" render={() =>
                <BlogList />
            } />
            <Route exact path="/users" render={() =>
                props.loggedUser ? <UserList /> : <Redirect to="/login" />
            } />
            <Route exact path="/users/:id" render={({ match }) =>
                <User user={userById(match.params.id)} />
            } />
            <Route path="/login" render={() =>
                <LoginForm />
            } />
          </div>
        </Router>
      </div>
  )
}

const mapDispatchToProps = {
  setNotification, getAllBlogs, setUser
}
const mapStateToProps = (state) => {
  return {
    loggedUser: state.loginUser,
    users: state.users
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
