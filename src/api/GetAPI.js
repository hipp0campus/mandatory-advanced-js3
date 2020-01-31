import axios from 'axios';

const GetAPI = (token) => {
  return axios.get(`http://3.120.96.16:3002/todos`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
  })
}

export default GetAPI;