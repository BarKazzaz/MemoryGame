import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp.component'
import Login from './components/Login.component'
import Home from './components/Home.component'

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/signup">
            <SignUp x={2} />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;