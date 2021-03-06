import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login';
import Registration from './components/Registration';
import Todo from './components/Todo';
import Navigation from './components/Navigation';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navigation/>
        <Route exact path="/" component={Todo} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
      </Router>
    )
  }
}

export default App;
