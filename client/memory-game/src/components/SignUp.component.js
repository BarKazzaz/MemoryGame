import React, { Component }  from 'react';

export default class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            x: props.x || 5,
            y: props.y || 3,
            bar: "nice"
        }
    }

    bar(x, y){
        return x * y;
    }

    render(){
        return(
            <div style={{
                backgroundColor:'red'
            }}>
                {this.state.bar}
                {this.bar(this.state.x, this.state.y)}
            </div>
        )
    }
}