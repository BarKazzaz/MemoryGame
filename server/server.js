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

var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: `http://localhost:${port}`}));
app.use(cors())
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production"){// if heroku is running
    console.log("for heroku!");
    app.use(express.static(path.resolve(__dirname, "..", "client", "memory-game", "build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "client", "memory-game", "build", "index.html"));
    });

}

Model.initConnection();
app.get("/bar", (req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    let users = [{name:"bar", score: 0}]
    let userName = req.query.user;
    let passwordname = req.query.password;
    let email = req.query.email;
    let country = req.query.country;
    let permissions = req.query.permissions;

    Model.insertUser(userName, passwordname,email,country,permissions);

    res.json(users);
});



app.get("/update", (req, _res) => {
    const _name = req.query.user;
    const password = req.query.password;
    const email = req.query.email;
    const country = req.query.country;
    console.log(_name);
    console.log(password);
    console.log(email);
    let myQuery = { name : _name , email : email, password : password};
    let newVals = { $set: req.body.vals };
    Model.update(myQuery, newVals, (err, res) => {
        err ? console.error(err) : _res.json({"updated": req.body})
    });
});

app.get("/search",(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const country = req.query.country;
    const userFound = Model.findUserByCountry(country);
    console.log(userFound);
    res.end('usersDet');

});

app.get("/list",(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const userFound = Model.showDetaels();
     console.log(userFound);
    res.end('usersDet');

});

app.get("/login", (req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    let userName = req.query.user;
    let passwordname = req.query.password;

    Model.findUserByNameAndPassword(userName, passwordname).then(userFound => {
        console.log(userFound);
        if(userFound != null){
            res.end(userFound.permissions)
        }
        else{
            res.end("guest")
        }
    } );
});



server.listen(port, (err) => {
    if (err) console.error(err);
    console.log(`server is running on port: ${port}`);
});