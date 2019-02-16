const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = "123abc!";
/*
bcrypt.genSalt(10,(err,salt) =>{
    bcrypt.hash(password,salt,(err,hash)=>{
        console.log(hash);
    })
})
*/


var hashedPassword = "$2a$10$PiETzLDJDX8gZY/UTVgxyuxcHJE8VWeH.xEjcjquo/fejDJdIP.ZC";
bcrypt.compare(password,hashedPassword,(err,res) =>{
    console.log(res);
})
/*
var data = {
    name:"Vishesh"
}

var tokenjwt = jwt.sign(data,"qwerty");
var tokensha = SHA256(data.id);

console.log(tokenjwt)
console.log(tokensha.toString());
*/

