const express = require("express");
const app = express();
const server = require("http").Server(app);
const socketIo = require("socket.io")(server);
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const setListeners = require(path.join(__dirname, "ServerHelpers")).setListeners;
const User = require("./model/user");

socketIo.on("connection", socket => {
    setListeners(socketIo, socket);
});

module.exports.connect = () => {
    return mongoose.connect("mongodb+srv://colman-user:1q2w3e4r@cluster0-l3nto.mongodb.net/memoryGame?retryWrites=true&w=majority", {useNewUrlParser: true})
        .then(() => {
            console.log('Connected to mongo db');
        });
};
if (process.env.NODE_ENV === "production"){// if heroku is running
    console.log("for heroku!");
    app.use(express.static(path.resolve(__dirname, "..", "client", "memory-game", "build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "client", "memory-game", "build", "index.html"));
    });
}

// simple get
app.get('/dvir', function (req, res) {
    User.find()
        .then(User => {
            res.json({
                confirmation: 'succes',
                data: profiles
            })
        })
            .catch(err=>{
            res.json({
            confirmation: 'fail',
                message: err.message
            })
        })
});

server.listen(port, (err) => {
    if (err) console.error(err);
    console.log(`server is running on port: ${port}`);
});