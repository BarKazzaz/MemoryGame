import React from 'react';
import SignUp from './components/SignUp.component'
import Login from './components/Login.component'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-title">Memory Game</h1>
      </header>
      <div className="btn" id="login_btn">Login</div>
      <div className="btn" id="signup_btn">Signup</div>
      <SignUp x={2} />
      <Login />
    </div>
  );
}

export default App;
