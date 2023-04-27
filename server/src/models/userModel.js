const mongoose =require('mongoose');

const userSchema=new mongoose.Schema({
    fullname:String,
    mobile:{type:Number, unique:true},
    email:{type :String ,unique:true},
    password:String
})

module.exports= mongoose.model('User',userSchema)