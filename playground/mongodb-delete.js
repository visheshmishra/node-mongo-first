const {MongoClient, ObjectID}  = require('mongodb');
MongoClient.connect("mongodb://localhost:27017/TodoApp",(err,client) =>{
if(err){
    return console.log("error in connecting database", err)
} 

console.log("connected to TodoApp");

const db = client.db("TodoApp");
/*
db.collection("Todos").deleteMany({text:"Eat Lunch"}).then((result) =>{
    console.log(result);
},(err) =>{
    console.log("getting error while connecting to collection");
})
*/
/*

db.collection("Todos").deleteOne({_id:new ObjectID("5bfd7f014ec96c061cd82520")}).then((result) =>{
    console.log(result);
}, (err) =>{
    console.log("error occured");
})
 */

 db.collection("Todos").findOneAndDelete({text:"walk the dog"}).then((result) =>{
     console.log(result);
 },(err) =>{
     console.log("error");
 })

})