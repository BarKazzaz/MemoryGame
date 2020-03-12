const express = require("express");
const app = express();
const server = require("http").Server(app);
const socketIo = require("socket.io")(server);
const path = require("path");
var bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const setListeners = require(path.join(__dirname, "ServerHelpers")).setListeners
const Model = require(path.join(__dirname, "model/model.js"));

socketIo.on("connection", socket => {
    setListeners(socketIo, socket);
});

app.use(bodyParser.json());

if (process.env.NODE_ENV === "production"){// if heroku is running
    console.log("for heroku!");
    app.use(express.static(path.resolve(__dirname, "..", "client", "memory-game", "build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "client", "memory-game", "build", "index.html"));
    });
}
app.get("/bar", (req, res)=>{
    let users = [{name:"bar", score: 0}]
    Model.printBar();
    res.json(users);
});

app.post("/update", (req, _res) => {
    //request should be : {"name":"Kazzaz", "vals": { "name" : "Blablabla", "score" : 22} }
    const _name = req.body.name;
    console.log(_name);
    let myQuery = { name : _name };
    let newVals = { $set: req.body.vals };
    Model.update(myQuery, newVals, (err, res) => {
        err ? console.error(err) : _res.json({"updated": req.body})
    });
});

server.listen(port, (err) => {
    if (err) console.error(err);
    console.log(`server is running on port: ${port}`);
});