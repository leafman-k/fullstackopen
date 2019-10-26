import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const addBlog = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}
const likeBlog = async (id, blog) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog)
  return response.data
}

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, config)

}
const commentBlog = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data
}

export default { getAll, addBlog, likeBlog, removeBlog, setToken, commentBlog }