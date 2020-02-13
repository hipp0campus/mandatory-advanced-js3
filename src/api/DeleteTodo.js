import axios from 'axios';

const DeleteTodo = (id) => {
  return axios.delete(`http://3.120.96.16:3002/todos/${id}`, { 
    headers: {
      Authorization: `Bearer ${window.localStorage.token}`
    }
  })
}

export default DeleteTodo;