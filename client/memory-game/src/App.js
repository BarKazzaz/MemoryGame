import React from 'react';
import {Route, Switch} from 'react-router';
import './App.css';
import SignUp from './components/SignUp.component'
import Login from './components/Login.component'
import Home from './components/Home.component'

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;