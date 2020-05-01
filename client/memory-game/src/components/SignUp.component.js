import React, { Component } from 'react';
import axios from 'axios';

const SERVER_ADDRESS = process.env.NODE_ENV === "development" ? 'http://localhost:5000' : "";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userToRegister: "",
            passToRegister: "",
            email: "",
            country: "",
            lat: 0.0,
            lng: 0.0,
            confpassToRegister: "",
            permissions: "user",
            status: 'loading'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.getUserIpInfo();
    }

    getUserIpInfo() {
        // API call to get user information based on browser public IP
        // *120 requests per minute + no SSL (https) with the free plan*
        fetch('http://www.geoplugin.net/json.gp',
            { mode: 'cors' })
            .then(res => res.json())
            .then(data => { console.log(data); return data })
            .then(data => this.setState({ country: data.geoplugin_countryName, lat: data.geoplugin_latitude, lng: data.geoplugin_longitude, status: 'ready' }))
            .catch(err => { console.log(err); this.setState({ country: null }) })
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        })
    }
    
    // POST request instead of GET
    // async handleSubmit() {
    //     params: {
    //         user: this.state.userToRegister,
    //         password: this.state.passToRegister,
    //         email: this.state.email,
    //         country: this.state.country,
    //         permissions: this.state.permissions,
    //         messages: this.state.messages,
    //         rudeMessages: this.state.rudeMessages,
    //         numOfGames: this.state.numOfGames,
    //         numOfVictoryGames: this.state.numOfVictoryGames
    //     }
    //     let res = await axios.post(`${SERVER_ADDRESS}/signup`, params);
    //     setTimeout((res) => { window.location = '/' }, 500);
    // }

    async handleSubmit() {
        if (!(this.state.userToRegister && this.state.email && this.state.passToRegister && this.state.confpassToRegister))
            return
        if (this.state.passToRegister !== this.state.confpassToRegister)
            return this.setState({ status: 'needConfirm' });
        const response = await axios.get(`${SERVER_ADDRESS}/signup`, {
            params: {
                user: this.state.userToRegister,
                password: this.state.passToRegister,
                email: this.state.email,
                country: this.state.country,
                lat: this.state.lat,
                lng: this.state.lng,
                permissions: this.state.permissions
            }
        });
        console.log(response.data);
        setTimeout(() => { window.location = '/' }, 500);
    }

    onSubmit = (e) => e.preventDefault();

    render() {
        if (this.state.status === 'loading') {
            return (
                <div className="login">
                    <h1 style={{ fontSize: 'smaller' }}>Loading...</h1>
                </div>
            )
        }
        if (this.state.status === 'needConfirm') {
            setTimeout(() => { this.setState({ status: 'ready' }) }, 1000);
            return (
                <div className="login">
                    <h1 style={{ fontSize: 'smaller' }}>Wrong confirmation password</h1>
                </div>
            )
        }
        else if (this.state.status === 'ready') {
            return (
                <div className="login">
                    <h1>Signup</h1>
                    <form onSubmit={this.onSubmit}>
                        <input
                            placeholder="User"
                            name="userToRegister"
                            type="text"
                            onChange={this.handleInputChange}
                            required
                        />
                        <br />
                        <input
                            placeholder="Password"
                            name="passToRegister"
                            type="password"
                            onChange={this.handleInputChange}
                            required
                        />
                        <br />
                        <input
                            placeholder="Email"
                            name="email"
                            type="text"
                            onChange={this.handleInputChange}
                            required
                        />
                        <br />
                        <input
                            placeholder="Password again"
                            name="confpassToRegister"
                            type="password"
                            onChange={this.handleInputChange}
                            required
                        />
                        <button type='submit' className="login_btn login_btn-primary login_btn-block login_btn-large" onClick={this.handleSubmit.bind(this)}>Sumbit</button>
                    </form>
                </div >
            )
        }
    }
}