const express = require("express");
const app = express();
const server = require("http").Server(app);
const socketIo = require("socket.io")(server);
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const Room = require("Room");
const Player = require("Player");
const maxPlayers = 2;
const rowSize = 4;
const colSize = 3;
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
    for(let i=0;i<4;i++){
        arr[i] = [];
        for(let j=0;j<3;j++){
            arr[i].push(matrix.pop());
        }
    }
    return arr;
}

socketIo.on("connection", socket => {
    socket.on("quickPlay", ()=>{
        let player = new Player();
        player.id = getRandomName();
        for(let room of roomsList) {
            if (room.players.length < maxPlayers) {
                room.players.push(player);
                socket.join(room.name);
                socket.emit("didJoin", {board: room.board, id: player.id});
                if(numOfPlayers<maxPlayers)
                socketIo.sockets.in(room.name).emit("lets start")
            }
        }
        let name = getRandomName();
        let room = new Room(name, maxPlayers);
        room.players.push(player);
        room.board = generateCardsBoard();
        roomsList.push(room);
        return socket.join(room.name);
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