

const notificationReducer = (state = '', action) => {
  console.log('notification state now: ', state)
  console.log('notificationReducer action', action)
  switch(action.type){
  case 'NEW_NOTIFICATION':
    return action.data
  case 'RESET':
    return ''
  default:
    return state
  }
}

export const setNotification = (notification) => {
  return dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: notification,
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET',
        data: null,
      })
    }, 2000)
  }
}

export default notificationReducer