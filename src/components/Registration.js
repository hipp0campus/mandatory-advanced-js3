import React from 'react';
import Form from './Form';
import { Redirect } from 'react-router-dom';

import PostAPI from '../api/PostAPI';
import { token$ } from './Token';

class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      token: token$.value,
      haveRegister: false,
      usernameAlreadyExists: false,
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
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

  handleSignIn(response) {
    const REGISTRATION_SUCCEEDED = 201;
    if (response.status === REGISTRATION_SUCCEEDED) {
      this.setState({ haveRegister: true })
    } else {
      this.setState({ usernameAlreadyExists: true })
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state;
    const callback = this.handleSignIn;
    const _ENDPOINT = '/register';

    PostAPI(username, password, callback, _ENDPOINT)
  }

  render() {
    if (this.state.haveRegister) return <Redirect to="/login" />;
    if (this.state.token) return <Redirect to="/" />

    let usernameValidation = null;
    if (this.usernameAlreadyExists) {
      usernameValidation = <p>a user with the given username is already registered</p>
    }

    return (
      <>
      {usernameValidation}
        <Form
          onSubmit={this.onSubmit} 
          onChange={this.onChange} 
          currentComponent={'registration'}
        />
      </>
    )
  }
}

export default Registration;