import React, { Component } from "react"
import GameCard from "./GameCard.component";
import Timer from "./Timer.component";

export default class Game extends Component{
    constructor(props){
        super(props);
        this.state = {
            player1 : {},
            player2 : {},
            currentPlayer : {},
            cards : props.cards || 
                    [[1,2,1,2],
                    [1,2,1,2] ]
        }
    }

    render(){
        let cardElms = [];
        for( let i = 0; i<this.state.cards.length; i++){
            let cardsRow = this.state.cards[i].map( (e, index) => {
                return <GameCard cardClass={e} key={index}/>
            })
            cardElms.push(<div style={{display:"inline-flex"}} className="cardsRow">{cardsRow}</div>);
        }
        return(
            <div>
                <Timer seconds={6}/>
                <div style={{display:"inline-grid"}}>{cardElms}</div>
            </div>
        )
    }
}