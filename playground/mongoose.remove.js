var  ObjectID = require('mongodb');
const {mongoose}  = require('../server/db/mongoose')
const {todos}  = require('../server/models/todo')
const {User} = require('../server/models/user')
var id = '5c309c12f64fb31468e3dd8b';

if(!ObjectID.ObjectId.isValid(id)){
     console.log('ID not valid')
}

todos.findByIdAndRemove({_id:id}).then((result) =>{
     if(result){
          console.log(result);
     }else{
          console.log("document not found");
     }
})