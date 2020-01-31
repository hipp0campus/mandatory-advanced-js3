import axios from 'axios';

const PostNewTodo = (token, todo) => {
  return axios.post('http://3.120.96.16:3002/todos', todo, { 
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export default PostNewTodo;