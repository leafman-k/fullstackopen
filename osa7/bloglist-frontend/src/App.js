/*eslint no-unused-vars:0*/
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

import { getAllBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'

import {
  BrowserRouter as Router,
  Route, Link, Redirect
} from 'react-router-dom'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import User from './components/User'
import Blog from './components/Blog'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

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

  const padding = { padding: 5 }
  const handleLogout = () => {
    window.localStorage.removeItem(
      'loggedUser'
    )
    props.setUser(null)
  }
  const userById = (id) => {
    console.log('user id: ', id)
    return props.users.find(user => user.id === id)
  }
  const blogById = (id) => {
    console.log('blog id: ', id)
    return props.blogs.find(blog => blog.id === id)
  }
  return (
    <div className="container">

      <Router>
        <div>
          <Navbar collapseOnSelect expand="lg" bg="light" variant="primary">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/blogs" data-cy-id="bloglink">Blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/users" data-cy-id="userlink">Users</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  {props.loginUser
                    ? <em>{props.loginUser.name} logged in
                      <button onClick={handleLogout} className="btn btn-primary btn-sm left-buffer "> logout </button></em>
                    : <Link to="/login" data-cy-id="loginlink">Login</Link>
                  }
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="jumbotron">
            <h2>Blogs</h2>
          </div>
          <Notification/>

          <Route exact path="/" render={() =>
            <BlogList />
          } />
          <Route exact path="/blogs" render={() =>
            <BlogList />
          } />
          <Route exact path="/blogs/:id" render={({ match }) =>
            <Blog blog={ blogById(match.params.id) }/>
          } />
          <Route exact path="/users" render={() =>
            props.loginUser ? <UserList /> : <Redirect to="/login" />
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
    loginUser: state.loginUser,
    users: state.users,
    blogs: state.blogs
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
