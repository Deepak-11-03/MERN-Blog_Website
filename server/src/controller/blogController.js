// const aws =require('aws-sdk')
const file =require('../aws.js')
const blogModel = require('../models/blogModel')
const userModel = require('../models/userModel.js')

// console.log(abc.)

module.exports.addBlog = async function (req, res) {
    try {
        let data =req.body
        let{title,category,description,authorName}=data

        let files = req.files
        if(files && files.length>0){
            let uploadedFileURL = await file.uploadFile(files[0])
            files=uploadedFileURL
        }    
        let userId =req.userid
        let info={title,category,description,image:files,authorName,userId:userId}
        const details= await blogModel.create(info)
        return res.status(201).send(details)   
    } catch (err) {
        return res.status(500).send({ status: false, error:err })
    }
}

module.exports.getBlogs=async(req,res)=>{
    try {
        const allBlogs=await blogModel.find({isDeleted:false}).sort({publishedAt:1})
        return res.status(200).send(allBlogs)
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports.userBlogs =async(req,res)=>{
    try {
        let userId =req.userid
        const blogs =await blogModel.find({userId:userId ,isDeleted:false}).sort({publishedAt:1})
        return res.status(200).send(blogs)
    } catch (error) {
        return res.status(500).send(error)
    }
}
module.exports.deleteBlog=async(req,res)=>{
    try {
        let userId =req.userid;
        let blogId =req.params.id
        let data =await blogModel.findOneAndUpdate({userId:userId,_id:blogId}, { $set: { isDeleted: true } })
        if(!data){
            return res.send('not deon')
        }
        return res.status(200).send("Done")

    } catch (error) {
        return res.status(500).send(error)
    }
}