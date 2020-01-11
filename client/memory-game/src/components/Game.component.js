import React, { Component } from "react"
import GameCard from "./GameCard.component";

export default class Game extends Component{
    constructor(props){
        super(props);
        this.state = {
            player1 : {},
            player2 : {},
            currentPlayer : {},
            cards : [1,2,1,2]
        }
    }



    render(){
        let cardElms = this.state.cards.map( (e,i)=> {
            return <GameCard cardClass={e}key={i}/>
        })
        return(
            cardElms
        )
    }

}