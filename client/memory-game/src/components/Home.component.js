import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import SignUp from './SignUp.component';
import Login from './Login.component';
import Game from './Game.component';
import Map from "./Map.component";
import Admin from "./Admin.component";


export default class Home extends Component {
  filteredContacts;

  constructor() {
    super();
    this.state = {
      perm: null
    }
  }

  componentDidMount() {
    let usr = JSON.parse(localStorage.getItem('user'));
    if (usr)
      this.setState({ perm: usr.permissions })
  }

  render() {
    if (!this.state.perm || this.state.perm === 'guest') return <Login />
    if (this.state.perm === 'admin') return <Admin />
    if (this.state.perm === 'user')
      return (
        <div className="Home">
          <header className="Home-header">
            <iframe title="clock iframe" src="http://free.timeanddate.com/clock/i799vdmy/n676" frameBorder="0" width="114"
              height="18"></iframe>
            <h1 className="home-title">Memory Game</h1>
          </header>
          <Router>
            <Switch>
              <Route exact path="/">
                <nav>
                  <Link className="btn" id="game_btn" to="/game">Play Game</Link>
                  <a className="btn" href='/' onClick={(e) => { localStorage.removeItem('user') }}>Logout</a>
                </nav>
                <p dir="ltr" style={{ position: 'absolute', bottom: '30px', left: '600px' }} >  <iframe src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/Memory-Game-102062231427241&tabs&width=500&height=70&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="450" height="80" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe></p>
                <p dir="ltr" style={{ position: 'absolute', bottom: '30px', left: '600px' }} > <iframe src="https://www.facebook.com/plugins/like.php?href=https://www.facebook.com/Memory-Game-102062231427241&width=500&layout=standard&action=like&size=large&show_faces=true&share=true&height=80&appId" width="450" height="80" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe></p>
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/game">
                <Game />
              </Route>
              <Route path="/map">
                <Map />
              </Route>
            </Switch>
          </Router>
        </div>
      )
  }
}