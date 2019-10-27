import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllUsers } from '../reducers/userReducer'
import UserRow from './UserRow'
import { Table } from 'react-bootstrap'

const UserList = (props) => {
  const users = props.users
  useEffect(() => {
    props.getAllUsers()
  }, [])

  return (
    <div className="row">
      <div className="col-sm-6">
        <Table striped>
          <tbody>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
            {users.map(user =>
              <UserRow key={user.id} user={user}/>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    loggedUser: state.loginUser,
    users: state.users
  }
}
export default connect(mapStateToProps, { getAllUsers })(UserList)