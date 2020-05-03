import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import SignUp from './SignUp.component';
import Login from './Login.component';
import Game from './Game.component';
import About from "./About.component";
import Admin from "./Admin.component";
import { SimplePieChart } from "./simplePieChart";

const SERVER_ADDRESS = process.env.NODE_ENV === "development" ? 'http://localhost:5000' : "";

export default class Home extends Component {
  filteredContacts;

  constructor() {
    super();
    this.state = {
      perm: null,
      games: 0,
      victories: 0,
      status: ''
    }
  }

  componentDidMount() {
    let usr = JSON.parse(localStorage.getItem('user'));
    if (usr) {
      this.setState({ perm: usr.Permissions })
      fetch(`${SERVER_ADDRESS}/api/getUserById?id=${usr._id}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.content.isBanned) {
            console.log("banned user")
            this.setState({ status: 'banned' })
          }
          if (data.type === 'ERROR') {
            this.setState({ status: 'noUser' });
            localStorage.removeItem('user');
          }
          return new Promise((resolve, reject) => resolve(data))
        })
        .then(data =>
          this.setState({
            status: this.state.status || 'ready',
            games: data.content.numOfGames - data.content.numOfVictoryGames,
            victories: data.content.numOfVictoryGames
          }))
        .catch(err => {
          console.log(err)
        });
    }
  }

  render() {
    if (!this.state.perm || this.state.perm === 'guest') return <Login />
    if (this.state.perm === 'admin') return <Admin />
    if (this.state.perm === 'user')
      if (this.state.status === 'ready') {
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
                  <section>
                    <div className="pie" id='winsPie'>
                      <p><span style={{ color: 'green', fontSize: '2em' }}>Wins</span>|<span style={{ color: 'blue', fontSize: '2em' }}>Losses</span></p>
                      <SimplePieChart games={this.state.games} victories={this.state.victories} />
                    </div>
                  </section>
                  <nav>
                    <Link className="btn" id="game_btn" to="/game">Play Game</Link>
                    <Link className="btn" id="game_btn" to="/about">Extras</Link>
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
                <Route path="/about">
                  <About />
                </Route>
              </Switch>
            </Router>
          </div>
        )
      } else if (this.state.status === 'banned') return (<div><h1>Your user is banned</h1><p>for more information contact barkazzaz@gmail.com</p></div>)
      else if (this.state.status === 'noUser') return (<div><h1>No such user</h1><p>for more information contact barkazzaz@gmail.com</p></div>)
      else
        return (
          <div>
            <h1>Loading...</h1>
          </div>
        )
  }
}