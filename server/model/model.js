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

function showDetaels(){
    const collection = client.db("Legends-Memory-Game").collection("Users");
    let usersDet = collection.find().toArray((err, res)=>{
        if(err) console.error(err);
        else console.log(res);
    });
    return usersDet;
}

async function findUserByCountry(country){
    const collection = client.db("Legends-Memory-Game").collection("Users");
    let usersDet = await collection.find(    { "country":   country  }).toArray((err, res)=>{
        if(err) console.error(err);
        else console.log(res);
    });
    return usersDet;
}

async function update(query, newValues, callback) {
    const collection = client.db("Legends-Memory-Game").collection("Users");
    console.log(query);
    const user = query.name;
    const password = query.password;
    const email = query.email;



    const foundUser = await findUserByName(user);
 //   console.log(foundUser);
    if (foundUser != null) {
        let answer = await collection.updateOne(
            {"name": foundUser.name},
            {$set: { "email": email, "password": password}}
        )

//        console.log(answer);
    } else {
        console.log("not found");
    }
}


async function insertUser(userName, passwordName,email,country) {
    const collection = client.db("Legends-Memory-Game").collection("Users");
    console.log(userName);

    try {
        await collection.insertOne({ name:  userName,password: passwordName, score: 0, email: email, country:country });

    }
    catch (e) {
        print (e);
    };

}
async function findUserByName(userName) {
    const query = { "name": userName};
    const collection = client.db("Legends-Memory-Game").collection("Users");
    var userFound = await collection.findOne(query);
    return userFound;
}

async function findUserByNameAndPassword(userName, password) {
    const query = { "name": userName, "password" : password};
    const collection = client.db("Legends-Memory-Game").collection("Users");
    var userFound = await collection.findOne(query);
    return userFound;
}


module.exports = { showDetaels:showDetaels,findUserByName:findUserByName, insertUser: insertUser, printBar : printBar,findUserByNameAndPassword:findUserByNameAndPassword, update : update, findUserByCountry:findUserByCountry,initConnection : initConnection};