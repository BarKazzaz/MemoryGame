import React, { Component } from 'react';
import axios from 'axios';

const SERVER_ADDRESS = process.env.NODE_ENV === "development" ? 'http://localhost:5000' : "/";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userToRegister: "",
            passToRegister: "",
            confpassToRegister: "",
            email: "",
            country: "",
            Permissions: "user",
            messages:0,
            rudeMessages:[""],
            numOfGames:"",
            numOfVictoryGames:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    bar(x, y) {
        return x * y;
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        })
    }

    async handleSubmit() {
        console.log(this.state);
        const response = await axios.get(SERVER_ADDRESS + '/signup', {
            params: {
                user: this.state.userToRegister,
                password: this.state.passToRegister,
                email: this.state.email,
                country:this.state.country,
                permissions:this.state.permissions,
                messages:this.state.messages,
                rudeMessages:this.state.rudeMessages,
                numOfGames:this.state.numOfGames,
                numOfVictoryGames:this.state.numOfVictoryGames
            }});
        console.log(response.data);
        setTimeout(() => { window.location = '/' }, 500);

    }

    onSubmit = (e) => e.preventDefault();

    render() {
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
                        // value={this.state.user}
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
                        placeholder="Country"
                        name="country"
                        type="text"
                        onChange={this.handleInputChange}
                        required
                    />
                    <button type='submit' className="login_btn login_btn-primary login_btn-block login_btn-large" onClick={this.handleSubmit.bind(this)}>Sumbit</button>
                </form>
            </div >
        )
    }
}