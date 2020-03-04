const express = require("express");
const app = express();
const server = require("http").Server(app);
const socketIo = require("socket.io")(server);
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const setListeners = require(path.join(__dirname, "ServerHelpers")).setListeners

socketIo.on("connection", socket => {
    setListeners(socketIo, socket);
});


if (process.env.NODE_ENV === "production"){// if heroku is running
    console.log("for heroku!");
    app.use(express.static(path.resolve(__dirname, "..", "client", "memory-game", "build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "client", "memory-game", "build", "index.html"));
    });
}

server.listen(port, (err) => {
    if (err) console.error(err);
    console.log(`server is running on port: ${port}`);
});