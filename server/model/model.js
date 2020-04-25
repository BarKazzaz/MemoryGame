const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://bar123:bar123@memorygamecluster-rae0j.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

function initConnection() {
    try {
        client.connect();
    }
    catch(e) {
        console.log("error ocurred while trying to connect to mogodb");
        client.close();
    }
}



function printBar(){
        const collection = client.db("Legends-Memory-Game").collection("Users");
        // perform actions on the collection object
        collection.find({"name" : "Bar"}).toArray((err, res)=>{
            if(err) console.error(err);
            else console.log(res);
        });
}

async function insertUser(userName, passwordName,email) {
    const collection = client.db("Legends-Memory-Game").collection("Users");
    console.log(userName);

    try {
        await collection.insertOne({ name:  userName,password: passwordName, score: 0, email: email });

    }
    catch (e) {
        print (e);
    };

}
async function findUserByName(userName, password) {

    const query = { "name": userName, "password" : password};
    const collection = client.db("Legends-Memory-Game").collection("Users");

    var userFound = await collection.findOne(query);
    console.log(userFound.name);
    console.log(userFound.email);
    return userFound;
}

function update(query, newValues, callback){
        const collection = client.db("Legends-Memory-Game").collection("Users");
        _query = {name:"Bar"};
        _newValues = {$set : {name:"Kazzaz", score:10} };
        collection.updateOne(query, newValues, (err, res) => {

            logger = (_err, _res) => {
                if(err) console.log(err);
                console.log(res);
            }
        });
}

module.exports = { findUserByName:findUserByName, insertUser: insertUser, printBar : printBar, update : update, initConnection : initConnection };