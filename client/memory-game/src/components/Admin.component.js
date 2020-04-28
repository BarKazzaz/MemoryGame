import React, { Component }  from 'react';

import axios from 'axios';

export default class Admin extends Component{
    constructor(props){
        super(props);
        this.state = {
            user : "",
            password : "",
            email : ""
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
        const update = await axios.get("http://localhost:5000/update", {
            params: {
                user: this.state.userToRegister,
                password: this.state.passToRegister,
                email: this.state.email
            }});
        console.log(update.data);
        const view = await axios.get("http://localhost:5000/list", {
            params: {
                user: this.state.userToRegister,
                password: this.state.passToRegister,
                email: this.state.email
            }});
        console.log(view.data);

        const search = await axios.get("http://localhost:5000/search", {
            params: {
                user: this.state.userToRegister,
                password: this.state.passToRegister,
                email: this.state.email
            }});
        console.log(search.data);
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
