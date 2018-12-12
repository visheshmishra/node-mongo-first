const {MongoClient, ObjectID}   = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) =>{
    if(err){
        return console.log('error occured while connecting with db ', err)
    }

    console.log("connected to TodoApp");
    const db = client.db("TodoApp");
    /*
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5c02df135f0b824f505fa194')
    },{
        $set:{
            text:"never ever have a break"
        }
    },
        {
            returnOriginal:false
        }
        ).then((res) =>{
            console.log(res);
        })
        */

    db.collection('User').findOneAndUpdate({
        _id: new ObjectID('5c02cbb55f0b824f505f9dd3')
    },{
        $set:{
            name:"Sunil"
        },
        $inc:{
           age:2 
        }
    },
    {
        returnOriginal:true
    }
    ).then((res) =>{
        console.log(res);
    })
        client.close();
    })