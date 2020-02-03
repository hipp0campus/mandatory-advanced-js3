import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { updateToken, token$ } from './Token';

const Header = styled.header`
  height: 70px;
  width: 100%;
  background: rgb(22,31,20);
  background: linear-gradient(90deg, rgba(22,31,20,1) 19%, rgba(57,103,49,1) 42%, rgba(11,45,6,1) 100%);
`;

const Container = styled.nav`
  position: sticky;
  top: 0px;
  max-width: 1170px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  font-family: 'Heebo', sans-serif;
  height: 70px;

  .icon {
    display: flex;
    align-items: center;
  }

  .email {
    font-family: 'Maven Pro', sans-serif;
    margin: 0px 5px;
    color: #fff;
  }

  ul {
    display: flex;
    align-items: center;
  }

  ul li {
    list-style: none;
    margin: 0px 20px;
  }

  a:link,
  a:visited,
  .logout {
    font-family: 'Maven Pro', sans-serif;
    text-decoration: none;
    cursor: pointer;
    color: #fff;
    font-size: 16px;
    display: block;
    height: 70px;
    line-height: 70px;
  }

  a:hover,
  a:active {
    color: #57b846;
  }

  .logout:hover {
    color: #57b846;
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
`;

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      decoded: {},
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
    let displayEmail = <i className="material-icons">star_border</i>;
    let logoutBtn = null;

    if (this.state.decoded) {
      displayEmail = <span className="email">{this.state.decoded.email}</span>;
      logoutBtn = <li className="logout" onClick={() => updateToken(null)}>Logout</li>;
    }

    return (
      <Header>
        <Container>
          <div className="icon">
            <i className="material-icons">star_border</i>
            {displayEmail}
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
            {logoutBtn}
          </ul>
        </Container>
      </Header>
    )
  }
}

export default Navigation;