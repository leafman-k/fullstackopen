import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService
        .getAll()
        .then(blogsInDB => {
          setBlogs(blogsInDB)
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
              type="text"
              value={username}
              name="Username"
              onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
              type="password"
              value={password}
              name="Password"
              onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
          'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setMessage({text:'wrong credentials', type:'error'})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const addedBlog = await blogService.addBlog({
        title, author, url
      })
      setBlogs(blogs.concat(addedBlog))
      setMessage(
          {text: `A new blog ${addedBlog.title} by ${addedBlog.author} added`, type: 'info'}
      )
      setTitle('')
      setAuthor('')
      setUrl('')

    } catch (exception) {
      setMessage({text:'Ooops, Something went wrong', type:'error'})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const handleLogout = () => {
      window.localStorage.removeItem(
          'loggedUser'
      )
      setUser(null)
  }


  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setUrl(event.target.value)
  }
  return (
    <div>
      <Notification message={message}/>
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
                        title={title}
                        author={author}
                        url={url}
                        handleTitleChange={handleTitleChange}
                        handleAuthorChange={handleAuthorChange}
                        handleUrlChange={handleUrlChange}/>
            </Togglable>
            <div>
              <h2>blogs</h2>
              {blogs.map(blog =>
                  <Blog key={blog.id} blog={blog} />
              )}
            </div>
          </div>
      }
    </div>
  );
}

export default App;
