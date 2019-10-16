import React from "react";
import {connect} from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import {useField} from '../hooks'
import {setNotification} from '../reducers/notificationReducer'
import {setUser} from '../reducers/userReducer'

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

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
      props.setUser(user)
      username.reset()
      password.reset()

    } catch (exception) {
      props.setNotification({ content:'wrong credentials', type:'error' })
    }
  }
  return (
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
}
const mapDispatchToProps = {
  setNotification, setUser
}
export default connect(null, mapDispatchToProps)(LoginForm)