import React, { Component }  from 'react';
import axios from 'axios';

export default class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            user: "",
            pass: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    compStyle = {}

    async handleSubmit(event){
        //TODO: send request to login to node server (via socket)
        const response = await axios.get("http://localhost:5001/login", {
            params: {
                user: this.state.user,
                password: this.state.pass
            }});
        console.log(response.data);
        console.log(this.state);

        if (response.data === 'found') {
            window.alert('you have been signed in succefully');
            setTimeout( () => { window.location = '/' }, 500);
        }
        else {
            // TODO: error in login page
            window.alert('your user has not found, redirecting to sign up page');
            setTimeout( () => { window.location = '/signup' }, 500);
        }
    }

    handleInputChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        })
    }

    render(){
        return(
            <div style={this.compStyle}>
                {/* <form onSubmit={this.handleSubmit}> */}
                <form>
                    <label>
                        User name:
                        <input
                            name="user"
                            // value={this.state.user}
                            type="text"
                            onChange={this.handleInputChange}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            name="pass"
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