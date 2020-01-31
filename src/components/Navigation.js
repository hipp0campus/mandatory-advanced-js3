import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.nav`
  position: sticky;
  top: 20px;
  max-width: 1170px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  ul {
    display: flex;
  }

  ul li {
    list-style: none;
    margin: 0px 40px;
  }

  .material-icons:first-child {
    margin-left: 40px;
  }

  .material-icons:nth-of-type(odd) {
    color: #57b846;
  }

  .material-icons:nth-of-type(2) {
    color: #587d38;
  }


`;

const Navigation = () => (
  <Container>
    <div className="icon">
      <i class="material-icons">star_border</i>
      <i class="material-icons">star_border</i>
      <i class="material-icons">star_border</i>
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
    </ul>
  </Container>
)

export default Navigation;