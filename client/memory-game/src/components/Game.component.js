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
            room:"",
            gameState:"pending",
            players:[],
            score: {player1 : 0, player2 : 0},
            currentPlayer : 'id',
            currentPlayerIndex: 0,
            myPlayerId: '',
            flippedCard: null,
            cards : [],//references to the cards
            cardElms: []//actual gameCard Elments to render
        }
        this.gameKeyHandler = this.gameKeyHandler.bind(this);
        this.timer = React.createRef();
        this.startGame = this.startGame.bind(this);
        this.endGame = this.endGame.bind(this);
        window.addEventListener("keydown", this.gameKeyHandler);
    }

    componentDidMount(){
        this.state.socket.emit("quickPlay");
        this.state.socket.on("didJoin", (data) => {
            let cards = data.board;
            let cardElms = [];
            for(let i = 0; i < cards.length; i++){
                this.state.cards.push([]);
                let cardsRow = cards[i].map( (e, index) => {
                    let cardRef = React.createRef();
                    this.state.cards[i].push(cardRef);
                    return <GameCard ref={this.state.cards[i][index]} parent={this} cardClass={e} key={index} I={i} J={index}/>
                })
                cardElms.push(<div style={{display:"inline-flex"}} key={i} row={i} className="cardsRow">{cardsRow}</div>);
            }
            this.setState({ room: data.room, cardElms: cardElms, myPlayerId: data.id, gameState: "connected" })
        });
        this.state.socket.on("lets start", (data) => {
            this.setState({currentPlayer: data.startingPlayer, players: data.players, gameState: "starting"})
        });
        this.state.socket.on("endTurn", ()=>this.endTurn());
        this.state.socket.on("flipCard", (card) => { this.flipCard(card[0], card[1]) });
    }
    componentWillUnmount(){
        //TODO: clear all listeners from timer and game
        //...
    }

    startGame(){
        this.setState({gameState:"running"});
        setTimeout(()=> this.timer.current.start(), 1000); //call the Timer start() function
    }
    endGame(){
        // stop timer
        this.setState({gameState:"ended"});
    }
    gameKeyHandler(e){
        // if(e.code === "KeyS" && this.state.gameState !== "running") { this.startGame(); console.log("starting.."); }
        // if(e.code === "KeyP" && this.state.gameState === "running") { this.endGame(); console.log("stoping.."); }
    }
    timerListener(e){
        if(e === "done"){ //timer event - the timer reached 00:00:00
            this.changeTurn();
        }
    }

    flipCard(i, j){
        let card = this.state.cards[i][j].current;
        card.flip();
        if(this.state.flippedCard !== null){
            if(this.state.flippedCard.state.cardClass === card.state.cardClass){
                let newScore = this.state.score;
                this.state.currentPlayer === this.state.myPlayerId ? newScore.player1++ : newScore.player2++;
                this.setState({score: newScore});
                this.setState({flippedCard : null});
                this.timer.current.reset();
            }else {
                this.timer.current.stop();
                setTimeout(()=>{
                    card.setState({flipped : false});
                    this.changeTurn();
                }, 200);
            }
        }else
            this.setState({flippedCard : card});
    }
    cardsClickHandler(cardIndexes){
        if(this.state.currentPlayer === this.state.myPlayerId){
            this.state.socket.emit("playerFlipped", {cardIndexes: cardIndexes, room: this.state.room});
        }
    }
    changeTurn(){
        if(this.state.currentPlayer === this.state.myPlayerId) {
            this.state.socket.emit("switchTurns", {room: this.state.room});
        }
    }

    endTurn(){
        this.timer.current.reset();
        this.timer.current.stop();
        let nextPlayerIndex = (this.state.currentPlayerIndex + 1)%2;
        this.setState({ currentPlayerIndex: nextPlayerIndex, currentPlayer: ((this.state.players[nextPlayerIndex].id)) });
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
        }else if(this.state.gameState === "connected"){
            return(
                <div>
                    <h2>Waiting for other players to join...</h2>
                </div>
            )
        }else if(this.state.gameState === "starting"){
            this.startGame();
            return(
                <div>
                    <h2>Connected. Starting game</h2>
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
        // let cardElms = [];
        // for( let i = 0; i<this.state.cards.length; i++){
        //     let cardsRow = this.state.cards[i].map( (e, index) => {
        //         return <GameCard parent={this} cardClass={e} key={index} ID={index} clickable={ this.state.currentPlayer === this.state.myPlayerId }/>
        //     })
        //     cardElms.push(<div style={{display:"inline-flex"}} key={i} className="cardsRow">{cardsRow}</div>);
        // }
        return(
            <div>
                <div>You are {this.state.myPlayerId}</div>
                <div>currentPlayer {this.state.currentPlayer}</div>
                <div>player <span style={{ fontFamily: "Roboto", textDecoration:"underline overline", fontWeight: "bold" }}>{ this.state.players[this.state.currentPlayerIndex].id}</span> it is your turn!</div>
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
                <div style={{ display:"inline-grid" }}>{this.state.cardElms}</div>
            </div>
        )
    }
}