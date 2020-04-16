This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running
Clone repository.
Run npm install.
Run npm start.
Go to http://localhost:3000.

## Assignment instructions
In this exercise you will create a Todo application with user registration and user authentication. A backend server has been provided for the exercise.<br/>

With this application a user will be able to create a new user, sign in and manage a list of todo items. <br/>

The authentication will be done using JSON Web Tokens (JWT).

## Backend server
A backend for this exercise is provided at: http://3.120.96.16.3002<br/>

The backend has endpoints for user registration, authentication and managing a personal todo list.

## Views

The application should contain at least three different pages:
<ul>
  <li>A "registration page" with a form used to register a new user</li>
  <li>A "login page" with a form used to sign in</li>
  <li>A "todos page" with a list of todos and form to add a new todo</li>
</ul>

Every page should share a header which shows the email address of the currently logged in user.
The email should be extracted from JWT token. <br/>

The header should also contain links to the login page, registration page and a button to sign out if the user is already signed in.

## Registration page
The registration page should contain a form with input fields for email and password.
When the form is submitted a new user should be added using the API. <br/>

An error message should be displayed if the API responds with an error.

## Login page
The login page should contain a form with input fields for email and password.
When the form is submitted the client receives a JWT token.
Save the token in localStorage so the user is still signed in if the page is refreshed.<br/>

An error message should be displayed if the API responds with an error.

## Todos page
The todo page should fetch a list of todos from the server and display them in a list. It should be possible to delete items from the list. <br/>

This page should also contain a form with a text input field used to add new todos. </br>

Display error messages if the API returns an error.

## Requirements
<ul>
  <li>The application should be an SPA written using React</li>
  <li>It should implement correct routing</li>
  <li>The user should stay signed in if the page is refreshed</li>
  <li>It should contain at least three views</li>
    <ul>
        <li>Registration page</li>
        <li>Login page</li>
        <li>Todos page</li>
    </ul>
  <li>The email shown in the header should be extracted from the JWT token. Save only the token in localStorage</li>
</ul>
