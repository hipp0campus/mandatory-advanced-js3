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
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
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

  handleLogIn(response) {
    updateToken(response.data.token)
  }

  onSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state;
    const callback = this.handleLogIn;
    const _ENDPOINT = '/auth';

    PostAPI(username, password, callback, _ENDPOINT)
  }
  
  render() {
    if (this.state.token) return <Redirect to="/" />
    return (
      <Form 
        onSubmit={this.onSubmit}
        onChange={this.onChange} 
        currentComponent={'login'} 
      />
    )
  }
}

export default Login;