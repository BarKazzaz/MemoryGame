import React, { Component }  from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import SignUp from './SignUp.component';
import Login from './Login.component';
import Game from './Game.component';




export default class Home extends Component{

    render(){
        return(
        <div className="Home">
          <header className="Home-header">
            <h1 className="home-title">Memory Game</h1>
          </header>
          <Router>
            <Switch>
              <Route exact path="/">
                {/* TODO: make this route a navbar component */}
                <nav>
                  <Link className="btn" id="login_btn" to="/login"> Login </Link>
                  <Link className="btn" id="signup_btn" to="/signup">Signup</Link>
                  <Link className="btn" id="game_btn" to="/game">Quick Game</Link>
                </nav>
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/signup">
                <SignUp/>
              </Route>
              <Route path="/game">
                <Game/>
              </Route>
            </Switch>
          </Router>
        </div>
        )
    }
}