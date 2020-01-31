import axios from 'axios';

const PostAPI = (email, password, endpoint) => {
  return axios.post(`http://3.120.96.16:3002${endpoint}`, {
    email,
    password,
  })
}

export default PostAPI;