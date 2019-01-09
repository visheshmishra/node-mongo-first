const {mongoose} = require('./db/mongoose');
const {todos} = require('./models/todo');
const {User} = require('./models/user');
const ObjectID = require('mongodb')
const express = require('express');
const  bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res) =>{
    var todo = new todos({
        text:req.body.text
    });

    todo.save().then((doc) =>{
     console.log(`new doc ${doc} saved successfully`);
      res.send(doc)  
      
    },(e) =>{
        res.status(400).send(e);
    })
	
	
    /*
    console.log(req.body);
    
    var user = new User({
        email:req.body.email
    });

    user.save().then((doc) =>{
        res.send(doc)
    },(e) =>{
        res.status(400).send(e);
    })
    */
})

app.get('/todos',(req,res) =>{
    todos.find().then((todos)=>{
        res.send({
            todos,
            "statusCode":200
        }),(e) =>{
            res.status(400).send(e);
        }
    })
})

app.get('/todos/:id',(req,res) =>{
    var id = req.params.id;
    console.log("id", id);
    if(!ObjectID.ObjectId.isValid(id)){
        return res.status(404).send();
    }
   console.log(id);
    todos.findById(id).then((todo) =>{
        if(!todo){
            return res.status(404).send(e);
        }

        res.send({todo})
    }).catch((e) =>{
       res.status(400).send();
    })
})

app.listen(port,() =>{
    console.log(`app is listening at ${port}`);
})

module.exports = {app}