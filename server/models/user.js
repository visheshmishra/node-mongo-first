var {mongoose}  = require('../db/mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken');
var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        minlength:1,
        trim:true,
        required:true,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:'{VALUE} is not valid email'

        }
    },
    password:{
        type:String,
        minlength:6,
        required:true,
        tokens:{
            access:{
                type:String,
                required:true
            },
            token:{
                type:String,
                required:true
            }
        }
    }
})
var User = mongoose.model('User',UserSchema);
UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user.id.toHexString(),access},'abc123').toString();
    console.log("token achieved");
    console.log(token);
   // user.tokens.push({access,token});
   user.tokens = user.tokens.concat([{access,token}]);

    return user.save().then(() =>{
        return token;
    })
}

module.exports ={User}