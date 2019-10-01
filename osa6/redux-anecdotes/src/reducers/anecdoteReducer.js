import anecdoteService from '../services/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type){
    case 'VOTE':
      const id = action.data.id

      return state.map(anecdote =>
          anecdote.id !== id ? anecdote : action.data
      ).sort((a, b) => a.votes > b.votes ? -1 : 0)
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}
export const voteAnecdote = (id, anecdote) => {

  return async dispatch => {
    const response = await anecdoteService.vote(id, anecdote)
    dispatch({
      type: 'VOTE',
      data: response
    })
  }
}
export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_NOTE',
      data: newAnecdote,
    })
  }
}
export default reducer