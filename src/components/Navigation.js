import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { updateToken, token$ } from './Token';

const Container = styled.nav`
  position: sticky;
  top: 0px;
  max-width: 1170px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  font-family: 'Heebo', sans-serif;
  height: 70px;
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(87,184,70,1) 61%, rgba(0,212,255,1) 100%);

  .icon {
    display: flex;
    align-items: center;
  }

  .email {
    margin: 0px 5px;
    color: #C4C4C4;
  }

  ul {
    display: flex;
    align-items: center;
  }

  ul li {
    list-style: none;
    margin: 0px 20px;
  }

  .material-icons {
    color: #587d38;
  }

  .material-icons:first-child {
    margin-left: 40px;
    color: #57b846;
  }

  .material-icons:last-child {
    color: #57b846;
  }

  .logout {
    cursor: pointer;
  }
`;

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      decoded: '',
    }
  }

  componentDidMount() {
    this.subscription = token$.subscribe(token => {
      const decoded = jwt.decode(token);

      this.setState({ decoded })
    })
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    let email = <i className="material-icons">star_border</i>;

    if (this.state.decoded) {
      email = <span className="email">{this.state.decoded.email}</span>;
    }

    return (
      <Container>
        <div className="icon">
          <i className="material-icons">star_border</i>
          {email}
          <i className="material-icons">star_border</i>
        </div>
        <ul>
          <Link to="/registration">
            <li>Register</li>
          </Link>
          <Link to="/login">
            <li>Login</li>
          </Link>
          <Link to="/">
            <li>Profile</li>
          </Link>
          <li className="logout" onClick={() => updateToken(null)}>Logout</li>
        </ul>
      </Container>
    )
  }
}

export default Navigation;