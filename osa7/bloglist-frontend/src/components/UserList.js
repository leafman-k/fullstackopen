import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {getAllUsers} from '../reducers/userReducer'
import UserRow from './UserRow'
const UserList = (props) => {
  const users = props.users
  useEffect(() => {
    props.getAllUsers()
  },[])

  return (
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map(user =>
            <UserRow key={user.id} user={user}/>
        )}
        </tbody>
      </table>
  )
}
const mapStateToProps = (state) => {
  return {
    loggedUser: state.loginUser,
    users: state.users
  }
}
export default connect(mapStateToProps, {getAllUsers})(UserList)