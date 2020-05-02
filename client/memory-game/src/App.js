import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp.component'
import About from './components/About.component'
import Home from './components/Home.component'


function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/signup">
            <SignUp/>
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
          <Route path="*">
            <div id="defaultRouteDiv">
              <h1>404 - Page not found</h1>
            </div>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;