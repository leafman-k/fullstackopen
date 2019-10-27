import React from "react";
import {connect} from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import {useField} from '../hooks'
import {setNotification} from '../reducers/notificationReducer'
import {setUser} from '../reducers/loginReducer'
import { withRouter } from 'react-router-dom'


const LoginNoHistory = (props) => {
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
      props.history.push('/users')
    } catch (exception) {
      props.setNotification({ content:'wrong credentials', type:'danger' })
    }
  }
  return (
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="Username">Username</label>
          <input
              type={username.type}
              value={username.value}
              name="Username"
              onChange={username.onChange}
              className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Password">password</label>
          <input
              type={password.type}
              value={password.value}
              name="Password"
              onChange={password.onChange}
              className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">login</button>
      </form>
  )
}
const Login = withRouter(LoginNoHistory)
const mapDispatchToProps = {
  setNotification, setUser
}
export default connect(null, mapDispatchToProps)(Login)