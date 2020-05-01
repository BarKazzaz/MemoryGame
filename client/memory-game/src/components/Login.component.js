import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './styles/login.css';
const SERVER_ADDRESS = process.env.NODE_ENV === "development" ? 'http://localhost:5000' : "";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "before",
            user: "",
            pass: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    compStyle = {}

    async handleSubmit(event) {
        if (!this.state.user || !this.state.pass) return;
        this.setState({ status: 'waiting' });
        const response = await axios.get(`${SERVER_ADDRESS}/login`, {
            params: {
                user: this.state.user,
                password: this.state.pass
            }
        });
        console.log(response);
        // if user not found OR server login error
        if (response.data.type === 'ERROR') return this.setState({ status: 'error' });
        // user found
        else if (response.data.type === 'OK'){
            console.log(response.data.content);
            localStorage.setItem('user', JSON.stringify(response.data.content));
            if (response.data.content.permissions === 'admin') {
                setTimeout(() => { window.location = '/' }, 500);
            } else if (response.data.content.permissions === 'user') {
                setTimeout(() => {
                    window.location = '/'
                }, 500);
            }
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        })
    }

    onSubmit = (e) => e.preventDefault();

    element =
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={this.onSubmit}>
                <input type="text" name="user" placeholder="Username" onChange={this.handleInputChange.bind(this)} required />
                <input type="password" name="pass" placeholder="Password" onChange={this.handleInputChange.bind(this)} required />
                <button type='submit' className="login_btn login_btn-primary login_btn-block login_btn-large" onClick={this.handleSubmit.bind(this)}>Let me in.</button>
            </form>
            <Link className="login_btn login_btn-secondary login_btn-block login_btn-small" to='/signup'>register</Link>
        </div>

    render() {
        if (this.state.status === 'before')
            return (
                <div>
                    {this.element}
                </div>
            )
        else if (this.state.status === 'waiting')
            return (
                <div className="login">
                    <h1 style={{ fontSize: 'smaller' }}>Sending..</h1>
                </div>
            )
        else {
            setTimeout(() => this.setState({ status: 'before', user: '', pass: '' }), 800);
            return (
                <div className="login">
                    <h1 style={{ color: 'red' }}>Wrong Username or Password</h1>
                </div>
            )
        }
    }
}