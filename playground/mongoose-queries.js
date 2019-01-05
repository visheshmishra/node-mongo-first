var  ObjectID = require('mongodb');
const {mongoose}  = require('../server/db/mongoose')
const {todos}  = require('../server/models/todo')
const {User} = require('../server/models/user')
var id = '6c055e8b5be28c0798e57466';

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
User.find({}).then((users) =>{
    console.log("find() method ", users);
})

User.findOne({
    _id:id
}).then((user) =>{
    if(!user){
        return console.log("there is no user ");
    }
    console.log("findOne() method ", user);
})

User.findById(id)
    .then((user) =>{
        if(!user){
           return  console.log("unable to find the user")
        }else{
            console.log('findById() method', user);
        }

    })