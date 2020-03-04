/*-- Imports --*/
const path = require("path");
const Room = require(path.join(__dirname, "Room"));
const Player = require(path.join(__dirname, "Player"));

/*-- Vars --*/
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

function setListeners(socketIo, socket){
    socket.on("quickPlay", () => {
        let player = new Player();
        let foundRoom = false;
        player.id = getRandomName();
        for(let room of roomsList) {
            if (room.players.length < maxPlayers) {
                room.players.push(player);
                socket.join(room.name);
                foundRoom = true;
                console.log(room.name);
                socket.emit("didJoin", { room: room.name, board: room.board, id: player.id});
                if(room.players.length === maxPlayers)
                    socketIo.sockets.in(room.name).emit("lets start", { startingPlayer: room.players[0].id, players: room.players });
            }
        }
        if(!foundRoom){
            let name = getRandomName();
            let room = new Room(name, maxPlayers);
            room.players.push(player);
            room.board = generateCardsBoard();
            roomsList.push(room);
            socket.join(room.name);
            socket.emit("didJoin", { room: room.name, board: room.board, id: player.id});
        }
    });
    socket.on("switchTurns", (data) => {
        socketIo.sockets.in(data.room).emit("endTurn");
    });
    socket.on("playerFlipped", (data) => {
        socketIo.sockets.in(data.room).emit("flipCard", data.cardIndexes);
    });
}

module.exports = {
    setListeners : setListeners
}