import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {setNotification} from "./reducers/notificationReducer";
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import  { useField } from './hooks'
const App = (props) => {

  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  useEffect(() => {
    blogService
      .getAll()
      .then(blogsInDB => {
        setBlogs(blogsInDB.sort((a, b) => (a.likes > b.likes) ? -1: 1))
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
          username
        <input
          type={username.type}
          value={username.value}
          name="Username"
          onChange={username.onChange}
        />
      </div>
      <div>
          password
        <input
          type={password.type}
          value={password.value}
          name="Password"
          onChange={password.onChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login(
        { username: username.value, password: password.value }
      )
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()

    } catch (exception) {
      props.setNotification({ content:'wrong credentials', type:'error' })
    }
  }
  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const addedBlog = await blogService.addBlog({
        title: title.value, author:author.value, url: url.value
      })
      setBlogs(blogs.concat(addedBlog).sort((a, b) => (a.likes > b.likes) ? -1: 1))
      props.setNotification(
        { content: `A new blog ${addedBlog.title} by ${addedBlog.author} added`, type: 'info' }
      )
      title.reset()
      author.reset()
      url.reset()

    } catch (exception) {
      props.setNotification({ content:'Ooops, Something went wrong', type:'error' })

    }

  }
  const likeBlog = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const likes = ++blog.likes
    const changedBlog = { title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes,
      user: blog.user.id }
    const updatedBlog = await blogService.likeBlog(id, changedBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog).sort((a, b) => (a.likes > b.likes) ? -1: 1))
  }

  const removeBlog = async (id) => {
    const removedBlog = blogs.find(blog => blog.id === id)
    if(window.confirm(`remove blog ${removedBlog.title} by ${removedBlog.author}`)) {
      try {
        await blogService.removeBlog(id)
        setBlogs(blogs.filter(blog => blog.id !== id))

      } catch (exception) {
        props.setNotification({ text: exception.response.data.error, type: 'error' })

      }
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem(
      'loggedUser'
    )
    setUser(null)
  }

  return (
    <div>
      <Notification/>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in
            <button onClick={() => handleLogout()}>
                logout
            </button>
          </p>
          <Togglable buttonLabel='new blog'>
            <BlogForm addBlog={addBlog}
              title={title.value}
              author={author.value}
              url={url.value}
              handleTitleChange={title.onChange}
              handleAuthorChange={author.onChange}
              handleUrlChange={url.onChange}/>
          </Togglable>
          <div>
            <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} likes={() => likeBlog(blog.id)} remove={() => removeBlog(blog.id)} user={user}/>
            )}
          </div>
        </div>
      }
    </div>
  )
}



export default connect(null, {setNotification})(App)
