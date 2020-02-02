import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import GetAPI from '../api/GetAPI';
import { updateToken, token$ } from './Token';
import PostNewTodo from '../api/PostNewTodo';
import DeleteTodo from '../api/DeleteTodo';

const Container = styled.div`
  margin-bottom: 30px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Heebo', sans-serif;
  max-width: 900px;
  margin: 70px auto;

  h1 {
    color: #57b846;
    font-weight: 400;
    letter-spacing: 1px;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-top: 15px;
  }

  .content {
    background-color: #f4f4f4;
    border-radius: 4px;
    width: 55%;
  }

  .content > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    margin: 15px 40px;
    padding: 10px 12px;
    color: #74749a;
    border-left: 4px solid #57b846;

    transition: all 0.3s ease-in-out;
  }

  .content > div:hover {
    border-left: 6px solid #57b846;
  }

  .delete-icon {
    color: #878787;
    cursor: pointer;
  }

  .input {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 40px;
  }

  .input input {
    box-sizing: border-box;
    width: 100%;
    padding: 9px;
    font-weight: 500;
    outline: none;
    font-size: 16px;
  }

  .add {
    position: absolute;
    color: #57b846;
    cursor: pointer;
    font-size: 70px;
    right: -35px;
    z-index: 1;
  }

`;

class Todo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      token: token$.value,
      todos: [],
      newTodo: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.subscription = token$.subscribe(token => {
      this.setState({ token })
    })

    this.fetchDataForTodos()
  }

  fetchDataForTodos() {
    GetAPI(this.state.token)
    .then(response => this.setState({ todos: response.data.todos }))
    .catch(err => {
      console.log(err.response);
      updateToken(null);
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  onSubmit(e) {
    e.preventDefault();

    let { newTodo } = this.state;
    let todo = { content: newTodo }

    PostNewTodo(todo)
      .then(() => this.componentDidMount())
      .catch(err => {
        console.log(err) //401
        updateToken(null); 
      })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onDelete(id) {
    DeleteTodo(id)
  }

  componentDidUpdate(prevState) {
    if (prevState.activeDate !== this.state.todos) {
      this.fetchDataForTodos()
    }
  }

  render() {
    if (!this.state.token) return <Redirect to="/login" />;

    return (
      <Container>
        <div className="content">
          <h1>TODO</h1>
          <form onSubmit={this.onSubmit}>
            <div className="input">
              <input 
                onChange={this.onChange} 
                type="text" 
                name="newTodo"
                minLength="1"
                required
              />
              <i 
                className="material-icons add"
                onClick={this.onSubmit}>
                add_circle
              </i>
            </div>
          </form>
          {this.state.todos
            .map(todo => 
              <div key={todo.id}>
                {todo.content}
                <i 
                  onClick={() => this.onDelete(todo.id)}
                  className="material-icons delete-icon">
                  delete
                </i>
              </div>
            )
          }
        </div>
      </Container>
    )
  }
}

export default Todo;