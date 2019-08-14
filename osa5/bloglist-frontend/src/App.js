import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])

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
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
      <Notification message={errorMessage}/>
      {user === null ?
          loginForm() :
          <div>
            <p>{user.name} logged in
              <button onClick={() => handleLogout()}>
                logout
              </button>
            </p>
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
