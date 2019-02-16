var {mongoose}  = require('../db/mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken');
var _  = require("lodash");
var bcrypt = require('bcryptjs');

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
        required:true
    },
    tokens:{
        access:{
            type:String,
            required:true,
            default: "auth"
        },
        token:{
            type:String,
            required:true,
            default: "test token"
        }
    }
})

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id','email']);     
}

UserSchema.methods.generateAuthToken = function(){
    debugger;
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
    console.log("token achieved");
    console.log(token);
    console.log(user.tokens);
    //user.tokens.push({access,token});
    //user.tokens = user.tokens.concat([{access,token}]);
    user.tokens.access = access;
    user.tokens.token = token;

    return user.save().then(() =>{
        return token;
    })
}

UserSchema.statics.findByToken = function(token){
    var user = this;
    var decoded;
    try{
        decoded = jwt.verify(token,'abc123');
    } catch(e){
        return Promise.reject(e);
    }

    return User.findOne({
        '_id':decoded._id,
        'tokens.access':'auth'
    })
}

UserSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10,(err,salt) =>{
            bcrypt.hash(user.password,salt,(err,hash) =>{
                user.password = hash;
                next();
            })
        })
    }else{
        next();
    }
})

UserSchema.statics.findByCredentials = function(email, password){
    var user = this;
    debugger;
    return user.findOne({email}).then((user) =>{
        console.log("user ===", user);
        if(!user){
            return Promise.reject();
        }

        return new Promise((resolve,reject) =>{
            bcrypt.compare(password,user.password,(err,res) =>{
                console.log("",res);
                if(res){
                    return resolve(user);
                }else{
                    return reject();
                }
            })
        })
    })
}

var User = mongoose.model('users',UserSchema);

module.exports ={User}