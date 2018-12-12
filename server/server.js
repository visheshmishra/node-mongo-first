const {mongoose} = require('./db/mongoose');
const {todos} = require('./models/todo');
const {User} = require('./models/user');

const express = require('express');
const  bodyParser = require('body-parser');

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

app.listen(3000,() =>{
    console.log("app is listening at 3000");
})

module.exports = {app}