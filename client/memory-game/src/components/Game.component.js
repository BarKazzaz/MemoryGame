import React, { Component } from "react"
import GameCard from "./GameCard.component";
import Timer from "./Timer.component";

export default class Game extends Component{
    constructor(props){
        super(props);
        this.state = {
            gameState:"pending",
            player1 : {},
            player2 : {},
            currentPlayer : 1,
            myPlayerId: 1,
            flippedCard: null,
            cards : props.cards || 
                    [[1,2,1,2],
                    [1,2,1,2] ]
        }
        this.gameKeyHandler = this.gameKeyHandler.bind(this);
        this.startGame = this.startGame.bind(this);
        this.endGame = this.endGame.bind(this);
        window.addEventListener("keydown", this.gameKeyHandler);
        this.timer = React.createRef();
    }

    startGame(){
        this.setState({gameState:"running"});
        setTimeout(()=> this.timer.current.start(), 2000);// call the Timer stop() function
    }
    endGame(){
        // stop timer
        this.setState({gameState:"ended"});
    }
    gameKeyHandler(e){
        if(e.code === "KeyS" && this.state.gameState !== "running") { this.startGame(); console.log("starting.."); }
        if(e.code === "KeyP" && this.state.gameState === "running") { this.endGame(); console.log("stoping.."); }
    }
    timerListener(e){
        if(e === "done"){ //switch user and restart timer
            this.endTurn();
        }
    }
    cardsClickHandelr(card){
        if(this.state.flippedCard !== null){
            if(this.state.flippedCard.state.cardClass === card.state.cardClass){
                //TODO: hide cards
                //...
                //TODO: give score
                this.setState({flippedCard : null});
                this.timer.current.reset();
            }else{
                this.timer.current.stop();
                setTimeout(()=>{
                    card.setState({flipped : false});
                    this.endTurn();
                }, 200);
            }
        }else
            this.setState({flippedCard : card});
    }
    endTurn(){
        this.timer.current.reset();
        this.setState({ currentPlayer: (this.state.currentPlayer === 1) ? 2 : 1 });
        if(this.state.flippedCard !== null){
            this.state.flippedCard.setState({flipped : false});
            this.setState({flippedCard : null});
        }
        this.timer.current.start();
    }
    render(){
        if(this.state.gameState === "pending"){
            return(
                <div>
                    <h2>Pending players connection...</h2>
                </div>
            )
        }else if(this.state.gameState === "ended"){
            return(
                <div>
                    <h2>GAME OVER</h2>
                </div>
            )
        }
        // if gameState === running
        let cardElms = [];
        for( let i = 0; i<this.state.cards.length; i++){
            let cardsRow = this.state.cards[i].map( (e, index) => {
                return <GameCard parent={this} cardClass={e} key={index} clickable={ this.state.currentPlayer === this.state.myPlayerId }/>
            })
            cardElms.push(<div style={{display:"inline-flex"}} className="cardsRow">{cardsRow}</div>);
        }
        return(
            <div>
                <div>player <span style={{ fontFamily: "Roboto", textDecoration:"underline overline", fontWeight: "bold" }}>{this.state.currentPlayer}</span> it is your turn!</div>
                <Timer ref={this.timer} seconds={6} parentElm={this}/>
                <div style={{ display:"inline-grid" }}>{cardElms}</div>
            </div>
        )
    }
}