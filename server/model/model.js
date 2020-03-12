const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://bar123:bar123@memorygamecluster-rae0j.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

function printBar(){
    client.connect(err => {
        const collection = client.db("Legends-Memory-Game").collection("Users");
        // perform actions on the collection object
        collection.find({"name" : "Bar"}).toArray((err, res)=>{
            if(err) console.error(err);
            else console.log(res);
        });
        client.close();
    });
}

async function getUserByName(userName, passwordName) {
    await client.connect();
    const collection = client.db("Legends-Memory-Game").collection("Users");
    console.log(userName);

    try {
        await collection.insertOne({ name:  userName,password: passwordName, score: 0 });
        client.close();
    }
    catch (e) {
        print (e);
        client.close();
    };

}

function update(query, newValues, callback){
    client.connect(err => {
        const collection = client.db("Legends-Memory-Game").collection("Users");
        // perform actions on the collection object
        // collection.updateOne(query, newValues, (err, res) => {
        _query = {name:"Bar"};
        _newValues = {$set : {name:"Kazzaz", score:10} };
        collection.updateOne(query, newValues, (err, res) => {
            // Promise.resolve(callback(err, res))
            // .then(client.close());
            logger = (_err, _res) => {
                if(err) console.log(err);
                console.log(res);
            }
            Promise.resolve(callback(err,res))
                .then(client.close());
        });
    });
}

module.exports = { getUserByName: getUserByName, printBar : printBar, update : update };