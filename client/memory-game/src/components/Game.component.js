import React, { Component } from "react"
import GameCard from "./GameCard.component";
import Timer from "./Timer.component";
import io from "socket.io-client";

const SERVER_ADDRESS = process.env.NODE_ENV === "development" ? 'http://localhost:5000': "/";

export default class Game extends Component{
    constructor(props){
        super(props);
        this.state = {
            socket: io(SERVER_ADDRESS),
            gameState:"pending",
            player1 : {},
            player2 : {},
            score: {player1 : 0, player2 : 0},
            currentPlayer : 1,
            myPlayerId: 1,
            flippedCard: null,
            cards : props.cards || 
                    [[1,2,3,4],
                    [5,6,4,1],
                    [6,2,5,3]]
        }
        this.gameKeyHandler = this.gameKeyHandler.bind(this);
        this.timer = React.createRef();
        this.startGame = this.startGame.bind(this);
        this.endGame = this.endGame.bind(this);
        window.addEventListener("keydown", this.gameKeyHandler);
    }

    componentDidMount(){
        this.state.socket.emit("quickPlay");
        this.state.socket.on("didJoin", (data) => this.setState({cards: data.board,myPlayerId: data.id, gameState: "connected"}));
        this.state.socket.on("lets start", (startingPlayer) => this.setState({currentPlayer: startingPlayer, gameState: "running"}));
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
                let newScore = this.state.score;
                this.state.currentPlayer === 1 ? newScore.player1++ : newScore.player2++;
                this.setState({score: newScore});
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
                    <h2>Pending server connection...</h2>
                </div>
            )
        }if(this.state.gameState === "connected"){
            return(
                <div>
                    <h2>Waiting for other players to join...</h2>
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
                <div id={"scoreboard"} style={{backgroundColor:"rgba(150,150,150,0.7)", width:"250px", marginLeft:"45%"}}>
                    <div>
                        <Timer ref={this.timer} seconds={6} parentElm={this} style={{fontSize:"20px", color: "red"}}/>
                    </div>
                    <div style={{display:"grid"}}>
                        <div style={{gridColumn:1, border:"darkred 2px solid"}}>
                            <div style={{background:"lightyellow", borderRadius:"15%", width:"55%", height:"55%", marginLeft:"24%"}}>
                                {this.state.score.player1}
                            </div>
                            <h1>Home</h1>
                        </div>
                        <div style={{gridColumn:2, border:"darkred 2px solid"}}>
                            <div style={{background:"lightyellow", borderRadius:"15%", width:"55%", height:"55%", marginLeft:"24%"}}>
                                {this.state.score.player2}
                            </div>
                            <h1>Away</h1>
                        </div>
                    </div>
                </div>
                <div style={{ display:"inline-grid" }}>{cardElms}</div>
            </div>
        )
    }
}