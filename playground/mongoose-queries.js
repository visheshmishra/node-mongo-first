var  ObjectID = require('mongodb');
const {mongoose}  = require('../server/db/mongoose')
const {todos}  = require('../server/models/todo')
const {User} = require('../server/models/user')
var id = '5c055e8b5be28c0798e5746611';

if(!ObjectID.ObjectId.isValid(id)){
     console.log('ID not valid')
}
/* 
todos.find({
    _id:id
}).then((todos) =>{
  console.log('find menthod ', todos);
})

todos.findOne({
    _id:id
}).then((todo) =>{
    console.log('findone method ',todo);
})

todos.findById(id).then((todo) =>{
    console.log('find by id', todo)
})
*/

User.findById(id)
    .then((user) =>{
        if(!user){
           return  console.log("unable to find the user")
        }else{
            console.log('user', user);
        }

    })