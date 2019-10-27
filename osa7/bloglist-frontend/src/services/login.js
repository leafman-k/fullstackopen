import axios from 'axios'
/*eslint no-undef:0*/
const baseUrl = BACKEND_URL+'/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }