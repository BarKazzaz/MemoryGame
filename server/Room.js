function Room(name, maxPlayers) {
    this.name = name;
    this.players=[];
    this.board = [];
    this.maxPlayers = maxPlayers;
}
module.exports = Room;