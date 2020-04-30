import React, { Component }  from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import SignUp from './SignUp.component';
import Login from './Login.component';
import Game from './Game.component';
import Map from "./Map.component";



export default class Home extends Component{
    filteredContacts;

    constructor() {
        super();
        this.state ={
            search: 'Level Up'
        }
    }

    updateSearch(event){
        this.setState({search:event.target.value.substr(0,20)})
        localStorage.getItem('permission')
        console.log(localStorage.getItem('permission'))
    }

    render(){
        return(
        <div className="Home">
            <form action="/action_page.php">
                <label htmlFor="gsearch">Search:</label>
                <input type="search" id="gsearch" name="gsearch"></input>
                    <input type="submit"></input>
            </form>
          <header className="Home-header">
                  <iframe title="clock iframe" src="http://free.timeanddate.com/clock/i799vdmy/n676"   frameBorder="0" width="114"
                          height="18"></iframe>

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
                    <Link className="btn" id="map_btn" to="/map">map example</Link>
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
                <Route path="/map">
                    <Map/>
                </Route>
            </Switch>
          </Router>
        </div>
        )
    }
}