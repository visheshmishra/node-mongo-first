var {mongoose} = require('../db/mongoose')

var todos = mongoose.model('todos',{
    text:{
        type:String,
        minlength:1,
        trim:true,
        required:true
    },
    completed:{
        type: Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    }
})

module.exports = {todos}