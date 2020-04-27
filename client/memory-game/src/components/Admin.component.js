import React, { Component }  from 'react';
import axios from 'axios';

export default class Admin extends Component{

    constructor(props){
        super(props);
        this.state = {
            // user: "",
            // pass: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    //    this.handleInputChange = this.handleInputChange.bind(this);
    }
    compStyle = {}

    async handleSubmit(event){
        //TODO: send request to login to node server (via socket)
        const response = await axios.get("http://localhost:5000/admin", {
            params: {
                // user: this.state.user,
                // password: this.state.pass
            }});
        let myData = [];
        for(let i = 0; i < response.data.length; i++) {
            myData.push(
             //   <Item key={i} item={response.data[i]} />
            );
        console.log(response.data);
        console.log(this.state);
            window.alert('you rule');
            // console.log(response.data)
           setTimeout( () => { window.location = '/admin' }, 500);
    }
    }



        render(){
            return(
                <div style={this.compStyle}>
                    {/* <form onSubmit={this.handleSubmit}> */}

                    <button onClick={this.handleSubmit}>Sumbit</button>
                </div>
            )
        }
}