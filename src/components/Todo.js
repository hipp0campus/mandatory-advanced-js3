import React from 'react';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import styled from 'styled-components';

import GetAPI from '../api/GetAPI';
import { updateToken, token$ } from './Token';
import PostNewTodo from '../api/PostNewTodo';

const Container = styled.div`
  height: 100vh;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Rubik', sans-serif;

  .content {

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
  }

  componentDidMount() {
    this.subscription = token$.subscribe(token => {
      this.setState({ token })
    })

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

  onClick() {
    updateToken(null);
  }

  onSubmit(e) {
    e.preventDefault();

    let { newTodo } = this.state;
    let todo = { content: newTodo }

    PostNewTodo(this.state.token, todo)
      .then(() => this.componentDidMount())
      .catch(err => {
        console.log(err) //401
        updateToken(null); 
      })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    if (!this.state.token) return <Redirect to="/login" />;

    const deleteIcon = <i className="material-icons">delete</i>

    console.log(this.state.newTodo)
    return (
      <Container>
        <div className="content">
          <h1>TODO</h1>
          <button onClick={this.onClick}>LOGOUT</button>
          <form onSubmit={this.onSubmit}>
            <input onChange={this.onChange} type="text" name="newTodo" />
          </form>
    {this.state.todos.map(todo => <div key={todo.id}>{todo.content} {deleteIcon}</div>)}
        </div>
      </Container>
    )
  }
}

export default Todo;