import React, { Component }  from 'react';

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

    handleSubmit(event){
        //TODO: send request to login to node server (via socket)
        console.log(this.state);
        setTimeout( () => { window.location = '/' }, 500);//redirect to home
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