function Room(name, maxPlayers) {
    this.name = name;
    this.players=[];
    this.board = [];
    this.maxPlayers = maxPlayers;
    this.removePlayer = (id) => {
        this.players = this.players.filter(p => p.id != id);
    }
    this.getPlayer = (id) => {
        return players.find(p => p.id === id);
    }
}
module.exports = Room;