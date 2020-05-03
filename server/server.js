const express = require("express");
const app = express();
const server = require("http").Server(app);
const socketIo = require("socket.io")(server);
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require(path.join(__dirname, "routes", "index.js"));

const port = process.env.PORT || 5000;
const setListeners = require(path.join(__dirname, "ServerHelpers")).setListeners
const Model = require(path.join(__dirname, "model/model.js"));

socketIo.on("connection", socket => {
    setListeners(socketIo, socket);
});

// use it before all route definitions
app.use(cors({origin: `http://localhost:${port}`}));
app.use(cors())
app.use('/api', routes.api);
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production"){// if heroku is running
    console.log("for heroku!");
    app.use(express.static(path.resolve(__dirname, "..", "client", "memory-game", "build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "client", "memory-game", "build", "index.html"));
    });

}

Model.initConnection();
app.get("/signup", (req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    let userName = req.query.user;
    let passwordname = req.query.password;
    let email = req.query.email;
    let country = req.query.country;
    let lat = req.query.lat;
    let lng = req.query.lng;
    let Permissions = req.query.Permissions;
    let numOfGames = 0;
    let messages = 0;
    let rudeMessages = [''];
    let numOfVictoryGames = 0;
    let isBanned = false;
    let isFound = Model.findUserByName(userName).then(isFound=> {
        if(isFound) {
            console.log(isFound)
            res.json({type: 'userFound', content: 'done'});
        }
        else {
             Model.insertUser(userName, passwordname, email, country, Permissions, messages, rudeMessages, numOfGames, numOfVictoryGames, isBanned, lat, lng);
            res.json({type: 'OK', content: 'done'});
        }
    });
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

app.get("/remove", (req, _res) => {
    const country = req.query.country;
    console.log(country);
    let myQuery = { country : country};
    let newVals = { $set: req.body.vals };
    Model.remove(myQuery,  (err, res) => {
        err ? console.error(err) : _res.json({"remove": req.body})
    });
});


app.get("/search",(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const country = req.query.country;
    const userFound = Model.findUserByCountry(country).then((data)=>{
        msg = {'type': 'OK', 'content': data}
        res.json(msg)
    }).catch(err => {
        msg = {'type':'ERROR','content': err};
        res.json(msg)
    });

});

app.get("/listUsers",(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    let msg;
    Model.showDetaels().then((data)=>{
        msg = {'type': 'OK', 'content': data}
        res.json(msg)
    }).catch(err => {
        msg = {'type':'ERROR','content': err};
        res.json(msg)
    })
});

app.get("/isBanned",(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    let msg;
    let name = req.name;
    console.log(name)

    Model.findUserByName(name).then(userFound => {
        console.log(userFound);
        if (userFound) {
            userFound = {'isBanned': userFound.isBanned}
            msg = {'type': 'OK', 'content': userFound}
            res.json(msg)
        } else {
            msg = {'type': 'ERROR', 'content': {'Permissions': 'Not Found'}};
            res.json(msg)
        }
    })
});
app.get("/login", (req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    let userName = req.query.user;
    let passwordname = req.query.password;
    let msg;
    Model.findUserByNameAndPassword(userName, passwordname).then(userFound => {
        console.log(userFound);
        if(userFound){
            delete(userFound.password)
            msg = {'type': 'OK', 'content': userFound}
            res.json(msg)
        }
        else{
            msg = {'type':'ERROR','content': {'Permissions': 'guest'}};
            res.json(msg)
        }
    } );
});


app.get("/BroadSearch", (req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    let userName = req.query.user;
    let country = req.query.country;
    let msg;
    Model.findUserByNameAndCountry(userName, country).then(userFound => {
        console.log(userFound);
        if(userFound){
            userFound = {'name': userFound.name, 'country': userFound.country}
            msg = {'type': 'OK', 'content': userFound}
            res.json(msg)
        }
        else{
            msg = {'type':'ERROR','content': {'Permissions': 'Not Found'}};
            res.json(msg)
        }
    } );
});

server.listen(port, (err) => {
    if (err) console.error(err);
    console.log(`server is running on port: ${port}`);
});