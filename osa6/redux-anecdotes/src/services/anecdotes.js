import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}
const createNew = async (content) => {
  const object = { content: content, id: getId(), votes: 0 }
  const response = await axios.post(url, object)
  return response.data
}
const vote = async (id, anecdote) => {

  const response = await axios.put(`${url}/${id}`, anecdote)
  return response.data
}
export default {
  getAll,
  createNew,
  vote
}