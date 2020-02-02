import React, { Component } from "react"

export default class GameCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            cardClass : props.cardClass || 1,
            flipped: false,
            clickable: props.clickable
        }
        this.parent = props.parent; // the game object should have cardsClickHandler(cardClass) implemented
        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidUpdate(prevProps){
        if(this.props.clickable !== prevProps.clickable)
            this.setState({ clickable : this.props.clickable });
    }
    clickHandler(event){
        if(this.state.clickable){
            this.setState({flipped : !this.state.flipped});
            this.parent.cardsClickHandelr(this);
        }
    }

    render(){
        let card = this.state.flipped ?
        <div className={"GameCard Card"+this.state.cardClass}></div>
        : <div className={"GameCard"} onClick={this.clickHandler}></div>
        return (card)
    }

}