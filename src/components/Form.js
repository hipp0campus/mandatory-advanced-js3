import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  height: 100vh;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Rubik', sans-serif;
  max-width: 1170px;
  margin: 0 auto;

  h1 {
    margin-bottom: 50px;
    color: #212529;
  }

  img {
    margin: 0 auto;
    border-radius: 50%;
    width: 200px;
    margin-bottom: 50px;
  }

  .form-container {
    padding: 40px;
    width: 400px;
  }

  .input-container {
    width: 350px;
    padding: 25px;
    position: relative;
  }

  .input-container::after {
    content: "";
    display: block;
    border: 1px solid black;
    width: 100%;
    border-color: #555555;
    opacity: 0.6;
    transition: all 0.5s;
  }

  .input-container:hover::after {
    border-color: #57b846;
  }

  .submit-container {
    width: 350px;
    padding: 25px;
  }

  .input {
    box-sizing: border-box;
    width: 100%;
    padding: 9px;
    font-weight: 600;
    outline: none;
    border: none;
    font-size: 16px;
  }

  input::placeholder {
    color: #555555;
    opacity: 0.6;
  }

  .submit {
    border-radius: 24px;
    padding: 14px;
    background-color: #57b846;
    color: #fff;
    text-transform: uppercase;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
  }

  .submit:hover {
    background-color: #212529;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    transform: translateY(-7px);
    opacity: 0.9;
  }

  footer {
    margin-top: 150px;
    font-size: 14px;
    color: #212529;
  }

  a:link,
  a:visited {
    text-decoration: none;
  }

  footer a:hover,
  footer a:active {
    color: #57b846;
  }

  .tooltip {
    position: absolute;
    right: ${props => props.currentComponent === 'login' ? '62px;' : '97.5px;'}
    top: -30px;
    border: 2px solid #878787;
    padding: 12px;
    border-radius: 10px;
    font-weight: 600;
  }

  .tooltip::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: #878787;
    border-bottom: 0;
    margin-left: -10px;
    margin-bottom: -10px;
  }
`;

const Form = (props) => {
  let footerText = null;
  let headerText = null;
  let inputValidation = null;

  const { currentComponent, onSubmit, onChange, username, password, invalidInput } = props;

  if (currentComponent === 'registration') {
    footerText = <h3>Already have an account? <Link to="/login">Login here</Link></h3>
    headerText = <h1>Register</h1>
    inputValidation = 'username already exist';
  } else if (currentComponent === 'login') {
    footerText = <h3>Don't have an account? <Link to="/registration">Register here</Link></h3>
    headerText = <h1>Log in</h1>
    inputValidation = 'incorrect username or password';
  }

  return (
    <Container currentComponent={currentComponent}>
      <div className="form-container">
        {headerText}
        <img src="https://www.w3schools.com/howto/img_avatar2.png" />
        <form onSubmit={onSubmit}>
          <div className="input-container">
          {invalidInput ? <div className="tooltip">{inputValidation}</div> : null}
            <input
              onChange={onChange}
              className="input name"
              type="email"
              placeholder="Email"
              name="username"
              value={username}
              required
            />
          </div>
          <div className="input-container">
            <input 
              onChange={onChange}
              className="input password"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              required
            />
          </div>
          <div className="submit-container">
          <input 
            className="input submit"
            type="submit"
          />
          </div>
        </form>
        <footer>
          {footerText}
        </footer>
      </div>
    </Container>
  )
}

export default Form;