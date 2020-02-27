import React, { Component } from "react"

export default class GameCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            cardClass : props.cardClass || 1,
            flipped: false,
            I: props.I,
            J: props.J,
            clickable: true
        }
        this.parentClickHandler = props.parentClickHandler;
        this.clickHandler = this.clickHandler.bind(this);
    }

    // componentDidUpdate(prevProps){
    //     if(this.props.clickable !== prevProps.clickable)
    //         this.setState({ clickable : this.props.clickable, flipped: this.props.flipped});
    // }
    flip(){
        this.setState({flipped : !this.state.flipped});
    }
    clickHandler(event){
        if(this.state.clickable){
            return this.parentClickHandler([this.state.I, this.state.J]);
        }
    }

    render(){
        let card = this.state.flipped ?
        <div className={"GameCard Card"+this.state.cardClass} style={{backgroundImage: `url("/cards/${this.state.cardClass}.jpg")`}}></div>
        : <div className={"GameCard"} onClick={this.clickHandler}></div>
        return (card)
    }

}