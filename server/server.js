const express = require("express");
const app = express();
const server = require("http").Server(app);
const socketIo = require("socket.io")(server);
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

socketIo.on("connection", socket => {
    console.log(socket);
})

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