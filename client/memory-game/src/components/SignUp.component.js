import React, { Component }  from 'react';
import axios from 'axios';

const SERVER_ADDRESS = process.env.NODE_ENV === "development" ? 'http://localhost:5000': "/";

export default class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            userToRegister: "",
            passToRegister: "",
            confpassToRegister: "",
            email: "",
            country: "",
            permissions: "user"
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    bar(x, y){
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
        const response = await axios.get(SERVER_ADDRESS+'/bar', {
            params: {
                user: this.state.userToRegister,
                password: this.state.passToRegister,
                email: this.state.email,
                country:this.state.country,
                permissions:this.state.permissions
            }});
        console.log(response.data);
        setTimeout( () => { window.location = '/' }, 500);

    }

    render(){
        return(
            <div style={this.compStyle}>
            {/* <form onSubmit={this.handleSubmit}> */}
            <form>
            <label>
            User name:
            <input
        name="userToRegister"
        type="text"
        onChange={this.handleInputChange}
        />
        </label>
            <br/>
                <label>
                    Email:
                    <input
                        name="email"
                        type="text"
                        onChange={this.handleInputChange}
                    />
                </label>
        <br/>
                <label>
                    Country:
                    <input
                        name="country"
                        type="text"
                        onChange={this.handleInputChange}
                    />
                </label>
                <br/>
        <label>
        Password:
    <input
        name="passToRegister"
        // value={this.state.user}
        type="password"
        onChange={this.handleInputChange}
        />
        </label>
                {/*<label>*/}
                {/*    permissions:*/}
                {/*    <input*/}
                {/*        name="permissions"*/}
                {/*        // value={this.state.user}*/}
                {/*        type="text"*/}
                {/*        onChange={this.handleInputChange}*/}
                {/*    />*/}
                {/*</label>*/}


        </form>
        <button onClick={this.handleSubmit}>Sumbit</button>
            </div>
    )
    }
}