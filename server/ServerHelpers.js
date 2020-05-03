/*-- Imports --*/
const path = require("path");
const Room = require(path.join(__dirname, "Room"));
const Player = require(path.join(__dirname, "Player"));
const ClassifierPromise = require(path.join(__dirname, "MessageClassifier"));
const Model = require(path.join(__dirname, "model/model.js"));

let MessageClassifier;
ClassifierPromise().then((cls) => {
    MessageClassifier = cls;
})

/*-- Vars --*/
const maxPlayers = 2;
const rowSize = 3;
const colSize = 4;
let roomsList = []; //rooms list

function getRandomName() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function generateCardsBoard() {
    let matrix = [];
    for (let i = 1; i < 7; i++) {
        matrix.push(i);
        matrix.push(i);
    }
    matrix.sort((a, b) => 0.5 - Math.random());
    let arr = [];
    for (let i = 0; i < rowSize; i++) {
        arr[i] = [];
        for (let j = 0; j < colSize; j++) {
            arr[i].push(matrix.pop());
        }
    }
    return arr;
}

function setListeners(socketIo, socket) {
    socket.on("quickPlay", (data) => {
        console.log("your name is:", data);
        let player = new Player();
        let foundRoom = false;
        player.id = data.id;
        player.name = data.name;
        for (let room of roomsList) {
            if ((room.players.length < maxPlayers) && !room.players.find(p => p.id === player.id)) {
                room.players.push(player);
                socket.join(room.name);
                foundRoom = true;
                console.log(room.name);
                socket.emit("didJoin", { room: room.name, board: room.board, id: player.id });
                if (room.players.length === maxPlayers)
                    socketIo.sockets.in(room.name).emit("lets start", { startingPlayer: room.players[0].id, players: room.players });
            }
        }
        if (!foundRoom) {
            let name = getRandomName();
            let room = new Room(name, maxPlayers);
            room.players.push(player);
            room.board = generateCardsBoard();
            roomsList.push(room);
            socket.join(room.name);
            socket.emit("didJoin", { room: room.name, board: room.board, id: player.id });
        }
    });
    socket.on("switchTurns", (data) => {
        socketIo.sockets.in(data.room).emit("endTurn");
    });
    socket.on("playerFlipped", (data) => {
        socketIo.sockets.in(data.room).emit("flipCard", data.cardIndexes);
    });
    socket.on("chatMsg", (data) => {
        // check for bad words
        let msgClass = MessageClassifier.classify(data.message.content);
        // let msgClassication = MessageClassifier.getClassifications(data.message.content);
        console.log(msgClass);
        Model.addToMessages(data.message.from)
            .then(data => console.log(data))
            .catch(err => console.log(err))
        if (msgClass === 'negative')
            Model.addToRudeMessages(data.message.from, data.message.content)
                .then(data => {
                    console.log(data);
                }).catch(err => console.log(err))
        socketIo.sockets.in(data.room).emit("chatMsg", data.message);
    });
    socket.on("leaver", (data) => {
        //data = {room : id, player : id}
        const room = getRoom(data.room);
        if (!room) return;
        room.removePlayer(data.player);
        if (room.players.length > 0)
            socketIo.sockets.in(data.room).emit("leaver");
        else
            deleteRoom(room.name);
    });
}
function deleteRoom(name) {
    console.log("deleting room:", name);
    roomsList = roomsList.filter(r => r.name != name);
    console.log(roomsList);
}

function getRoom(name) {
    return roomsList.find(r => r.name === name)
}

module.exports = {
    setListeners: setListeners
}