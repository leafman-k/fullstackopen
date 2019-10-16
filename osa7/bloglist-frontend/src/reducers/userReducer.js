
const userReducer = (state = '', action) => {

  console.log('notification state now: ', state)
  console.log('notificationReducer action', action)
  switch(action.type){
    case 'SET_USER':
      return action.data
    default:
      return state
  }
}
export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user,
    })
  }
}

export default userReducer