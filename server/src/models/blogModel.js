const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;
const blogSchema = new mongoose.Schema({
    title: {
        type:String,
        trim: true,
        // required:true
    },
    image:String,
    description:{
        type:String,
        trim: true,
        // required:true
    },
    authorName: {
        trim: true,
        type: String,
    },
    userId:{
        type:ObjectId,
        ref:'User'
    },
    category: {
        type: String,
        trim: true,  
    },
    publishedAt: {
        type:String,
        default: new Date().toLocaleString()
    },  
    isDeleted: { 
        type: Boolean, 
        default: false
    },
  
    
},{timestamps:true})


module.exports = mongoose.model("Blog", blogSchema)