import axios from 'axios'
/*eslint no-undef:0*/
const baseUrl = BACKEND_URL+'/users'

const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAllUsers }