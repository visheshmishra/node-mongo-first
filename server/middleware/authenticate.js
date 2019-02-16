var {User} = require('../models/user');
var authenticate = (req,res,next) =>{
    var token = req.header('x-auth');
    debugger;
    User.findByToken(token).then((user) =>{
        console.log(user);
        if(!user){
            return Promise.reject();
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((e) =>{
        res.status(401).send();
    })
}

module.exports = {authenticate};