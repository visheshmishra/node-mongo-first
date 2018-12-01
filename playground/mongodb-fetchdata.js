const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) => {
    if(err){
        return console.log("error occured while connection ", err);
    }

    console.log('conneted to mongo db');
    const db = client.db('TodoApp');

    /*
    db.collection('Todos').find({
                _id: new ObjectID('5c02bc9b5f0b824f505f9c8a')
            }).toArray().then((docs) =>{
        console.log(docs);
        console.log(JSON.stringify(docs,undefined,2))
    }, (err) =>{
        console.log("unable to fetch Todos", err);
    })
db.collection('Todos').find().count().then((count) =>{
    console.log('Number of records ', count);
},(err) =>{
    console.log('unable to get connected with collection');
})
*/
db.collection('User').find({name:"A"}).toArray().then((docs) =>{
    console.log(JSON.stringify(docs,undefined,2))
}, (err) =>{
    console.log("got error");
})
    client.close();
})