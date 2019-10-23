
const loginReducer = (state = {}, action) => {

  console.log('notification state now: ', state)
  console.log('notificationReducer action', action)
  switch(action.type){
    case 'LOGIN':
      return action.data
    default:
      return state
  }
}
export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      data: user,
    })
  }
}

export default loginReducer