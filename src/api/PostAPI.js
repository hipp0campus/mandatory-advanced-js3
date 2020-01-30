import axios from 'axios';

const PostAPI = (email, password, cb, endpoint) => {
  axios.post(`http://3.120.96.16:3002${endpoint}`, {
    email,
    password,
  })
  .then(response => {
    return cb(response);
  })
  .catch(err => {
    console.log(err.response);
    return cb(err.response);
  })
}

export default PostAPI;