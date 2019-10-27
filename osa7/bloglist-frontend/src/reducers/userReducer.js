import userService from '../services/users'

const userReducer = (state = [], action) => {

  console.log('users state now: ', state)
  console.log('users action', action)
  switch(action.type){
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}
export const getAllUsers = () => {
  return async dispatch => {
    const users = await userService.getAllUsers()
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}
export default userReducer