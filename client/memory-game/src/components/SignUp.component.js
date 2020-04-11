import React, { Component }  from 'react';
import axios from 'axios';

export default class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            userToRegister: "",
            passToRegister: "",
            confpassToRegister: ""

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
        const response = await axios.get("http://localhost:5000/bar", {
            params: {
                user: this.state.userToRegister,
                password: this.state.passToRegister
            }});
        console.log(response.data);
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



        <label>
        Password:
    <input
        name="passToRegister"
        // value={this.state.user}
        type="password"
        onChange={this.handleInputChange}
        />
        </label>



        </form>
        <button onClick={this.handleSubmit}>Sumbit</button>
            </div>
    )
    }
}