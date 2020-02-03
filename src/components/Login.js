import React from 'react';
import Form from './Form';
import { Redirect } from 'react-router-dom';

import PostAPI from '../api/PostAPI';
import { updateToken, token$ } from './Token';

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      token: token$.value,
      invalidInput: false,
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.subscription = token$.subscribe(token => {
      this.setState({ token })
    })
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state;
    const _ENDPOINT = '/auth';

    PostAPI(username, password, _ENDPOINT)
      .then(response => updateToken(response.data.token))
      .catch(err => {
        console.log(err.response)
        this.setState({ 
          password: '',
          username: '',
          invalidInput: true
        })
        updateToken(err.response.data.token)
      })
  }
  
  render() {
    if (this.state.token) return <Redirect to="/" />
    return (
      <Form 
        onSubmit={this.onSubmit}
        onChange={this.onChange} 
        currentComponent={'login'}
        password={this.state.password}
        username={this.state.username}
        invalidInput={this.state.invalidInput}
      />
    )
  }
}

export default Login;