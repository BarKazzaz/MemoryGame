import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp.component'
import Login from './components/Login.component'
import Home from './components/Home.component'
import Map from "./components/Map.component";
import Admin from "./components/Admin.component";


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
          <Route path="*">
            {/* TODO: make this a "default" component */}
            <div id="defaultRouteDiv">
              <h1>404 - Page not found</h1>
            </div>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;