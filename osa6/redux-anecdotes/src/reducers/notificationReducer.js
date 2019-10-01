import anecdoteService from "../services/anecdotes";


const notificationReducer = (state = 'Something went wrong', action) => {
  console.log('notification state now: ', state)
  console.log('notificationReducer action', action)
  switch(action.type){
    case 'NEW_NOTIFICATION':
      return action.notification
    case 'RESET':
      return ''
    default:
      return state
  }
}
export const createNotification = (content) => {
  return {
    type: 'NEW_NOTIFICATION',
    notification: content
  }
}
export const resetNotification = () => {
  return {
    type: 'NEW_NOTIFICATION',
    notification: ''
  }
}
export const setNotification = (content, timeout) => {
  return dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      notification: content,
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET',
        notification: '',
      })
    }, timeout*1000)
  }
}
export default notificationReducer