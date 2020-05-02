const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const uri = "mongodb+srv://bar123:bar123@memorygamecluster-rae0j.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

function initConnection() {
    try {
        client.connect();
    } catch (e) {
        console.log("error ocurred while trying to connect to mogodb");
        client.close();
    }
}


function printBar() {
    const collection = client.db("Legends-Memory-Game").collection("Users");
    // perform actions on the collection object
    collection.find({ "name": "Bar" }).toArray((err, res) => {
        if (err) console.error(err);
        else console.log(res);
    });
}

function showDetaels() {
    const collection = client.db("Legends-Memory-Game").collection("Users");
    return new Promise((resolve, reject) => {
        collection.find().toArray((err, res) => {
            if (err) reject(res);
            else resolve(res);
        });
    });
}


async function isBannedFunction(name) {
    const query = { "name": name };
    const collection = client.db("Legends-Memory-Game").collection("Users");
    var userFound = await collection.findOne(query);
    console.log(userFound);
    return userFound.isBanned;
}


async function findUserByCountry(country) {
    const collection = client.db("Legends-Memory-Game").collection("Users");
    return new Promise((resolve, reject) => {
        collection.find({ "country": country }).toArray((err, res) => {
            if (err) reject(res);
            else resolve(res);
        });
    });
}

async function update(query, newValues, callback) {
    const collection = client.db("Legends-Memory-Game").collection("Users");
    console.log(query);
    const user = query.name;
    const password = query.password;
    const email = query.email;


    const foundUser = await findUserByName(user);
    // console.log(foundUser);
    if (foundUser != null) {
        let answer = await collection.updateOne(
            { "name": foundUser.name },
            { $set: { "email": email, "password": password } }
        )
        // console.log(answer);
    } else {
        console.log("not found");
    }
}


async function remove(query, callback) {
    const collection = client.db("Legends-Memory-Game").collection("Users");
    console.log(query.country);
    const country = query.country;
    return new Promise((resolve, reject) => {
        collection.deleteOne({ "country": country })
    });
}


async function insertUser(userName, passwordName, email, country, Permissions, messages, rudeMessages, numOfGames, numOfVictoryGames, isBanned, lat, lng) {
    const collection = client.db("Legends-Memory-Game").collection("Users");
    console.log(userName);

    try {
        await collection.insertOne({
            name: userName,
            password: passwordName,
            score: 0,
            email: email,
            country: country,
            Permissions: Permissions,
            messages: messages,
            rudeMessages: rudeMessages,
            numOfGames: numOfGames,
            numOfVictoryGames: numOfVictoryGames,
            isBanned: isBanned,
            lng: lng,
            lat: lat
        });
    } catch (e) {
        console.log(e);
    };
}

async function findUserByName(userName) {
    const query = { "name": userName };
    const collection = client.db("Legends-Memory-Game").collection("Users");
    var userFound = await collection.findOne(query);
    return userFound;
}

async function findUserByNameAndPassword(userName, password) {
    const query = { "name": userName, "password": password };
    const collection = client.db("Legends-Memory-Game").collection("Users");
    var userFound = await collection.findOne(query);
    console.log(userFound);
    return userFound;
}

async function findUserByNameAndCountry(userName, country) {
    const query = { "name": userName, "country": country };
    const collection = client.db("Legends-Memory-Game").collection("Users");
    var userFound = await collection.findOne(query);
    // console.log(userFound);
    return userFound;
}

function getUserById(id) {
    return new Promise((resolve, reject) => {
        let o_id = new mongo.ObjectID(id);
        const query = { "_id": o_id };
        const collection = client.db("Legends-Memory-Game").collection("Users");
        collection.findOne(query)
            .then((data, err) => {
                if (err) reject(err)
                else resolve(data)
            });
    })
}

function addToRudeMessages(id, message) {
    return new Promise((resolve, reject) => {
        let o_id = new mongo.ObjectID(id);
        getUserById(id)
            .then((data) => {
                const query = { "_id": o_id };
                const collection = client.db("Legends-Memory-Game").collection("Users");
                if(data.rudeMessages[0] === '') data.rudeMessages[0] = message
                else data.rudeMessages.push(message);
                console.log('rudes', data.rudeMessages);
                collection.updateOne(query, {$set: {rudeMessages: data.rudeMessages}})
                .then(data=>resolve(data))
                .catch(err => reject(err))
            }).catch(err => reject(err));
    })
}


function addToVictoryGames(id) {
    return new Promise((resolve, reject) => {
        let o_id = new mongo.ObjectID(id);
        getUserById(id)
            .then((data) => {
                const query = { "_id": o_id };
                const collection = client.db("Legends-Memory-Game").collection("Users");
                collection.updateOne(query, {$set: {numOfVictoryGames: data.numOfVictoryGames+1}})
                    .then(data=>resolve(data))
                    .catch(err => reject(err))
            }).catch(err => reject(err));
    })
}


function addToGames(id) {
    return new Promise((resolve, reject) => {
        let o_id = new mongo.ObjectID(id);
        getUserById(id)
            .then((data) => {
                const query = { "_id": o_id };
                const collection = client.db("Legends-Memory-Game").collection("Users");
                collection.updateOne(query, {$set: {numOfGames: data.numOfGames+1}})
                    .then(data=>resolve(data))
                    .catch(err => reject(err))
            }).catch(err => reject(err));
    })
}


module.exports = {
    showDetaels: showDetaels,
    findUserByName: findUserByName,
    findUserByNameAndCountry: findUserByNameAndCountry,
    insertUser: insertUser,
    printBar: printBar,
    remove: remove,
    findUserByNameAndPassword: findUserByNameAndPassword,
    update: update,
    findUserByCountry: findUserByCountry,
    initConnection: initConnection,
    isBannedFunction: isBannedFunction,
    getUserById: getUserById,
    addToRudeMessages: addToRudeMessages,
    addToVictoryGames:addToVictoryGames
};