import React, { Component } from "react"

export default class GameCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            cardClass : props.cardClass || 1,
            flipped: false
        }
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(event){
        this.setState({flipped:!this.state.flipped})
    }

    render(){
        let card = this.state.flipped ? <div className={"GameCard Card"+this.state.cardClass}></div> : <div className={"GameCard"} onClick={this.clickHandler}></div>
        return (card)
    }

}