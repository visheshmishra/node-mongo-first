const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    name:"Vishesh"
}

var tokenjwt = jwt.sign(data,"qwerty");
var tokensha = SHA256(data.id);

console.log(tokenjwt)
console.log(tokensha.toString());