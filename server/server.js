const express = require("express");
const app = express();
const server = require("http").Server(app);
const socketIo = require("socket.io")(server);
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const Room = require(path.join(__dirname, "Room"));
const Player = require(path.join(__dirname, "Player"));
const maxPlayers = 2;
const rowSize = 3;
const colSize = 4;
let roomsList = []; //rooms list

function getRandomName(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

function generateCardsBoard(){
    let matrix = [];
    for(let i=1;i<7;i++){
        matrix.push(i);
        matrix.push(i);
    }
    matrix.sort((a,b)=>0.5-Math.random());
    let arr= [];
    for(let i=0;i<rowSize;i++){
        arr[i] = [];
        for(let j=0;j<colSize;j++){
            arr[i].push(matrix.pop());
        }
    }
    return arr;
}

socketIo.on("connection", socket => {
    socket.on("quickPlay", ()=>{
        let player = new Player();
        let foundRoom = false;
        player.id = getRandomName();
        for(let room of roomsList) {
            if (room.players.length < maxPlayers) {
                room.players.push(player);
                socket.join(room.name);
                foundRoom = true;
                socket.emit("didJoin", {board: room.board, id: player.id});
                if(room.players.length === maxPlayers)
                    socketIo.sockets.in(room.name).emit("lets start");
            }
        }
        if(!foundRoom){
            let name = getRandomName();
            let room = new Room(name, maxPlayers);
            room.players.push(player);
            room.board = generateCardsBoard();
            roomsList.push(room);
            socket.join(room.name);
            socket.emit("didJoin", {board: room.board, id: player.id});
        }
    });
});

if (process.env.NODE_ENV === "production"){// if heroku is running
    console.log("for heroku!");
    app.use(express.static(path.resolve(__dirname, "..", "kazz-io", "build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "kazz-io", "build", "index.html"));
    });
}
server.listen(port, (err) => {
    if (err) console.error(err);
    console.log(`server is running on port: ${port}`);
});