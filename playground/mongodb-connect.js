const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) =>{
    if(err){
        return console.log("unbale to connect to mongodb server")
    }
    console.log("Connected to  mongodb server");
    const db = client.db("TodoApp");
  /*  db.collection('Todos').insertOne({
        text:"Something to do",
        completed:false
    },(err,result) =>{
        if(err){
            return console.log('unable to insert ', err);
        }
        console.log(JSON.stringify(result.ops,undefined,2));
    });*/

    db.collection('User').insertOne({
        name:"Chutiya",
        age:"27",
        location:"noida"
    },(err,res) =>{
        if(err){
            return console.log('error occured while inserting data', err);
        }
        
        console.log(JSON.stringify(res.ops, undefined,2));
    })
    client.close();
}); 