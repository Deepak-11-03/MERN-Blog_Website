// const aws =require('aws-sdk')
const blogModel = require('../models/blogModel')

// console.log(abc.)

module.exports.addBlog = async function (req, res) {
    try {
        let data =req.body
        let{title,category,description,authorName,image}=data
        let userId =req.userid
        let info={title,category,description,image:image,authorName,userId:userId}
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
        return res.status(500).send(error.message)
    }
}

module.exports.getBlogById=async(req,res)=>{
    try {
        let blogId= req.params.id;
        const blogDetails = await blogModel.findById(blogId)
        return res.status(200).send(blogDetails)
    } catch (error) {
        return res.status(500).send(error.message)
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
module.exports.updateBlog=async(req,res)=>{
    try {
        let userId =req.userid;
        let blogId =req.params.id
        let updatedBlog =await blogModel.findOneAndUpdate({userId:userId,_id:blogId},req.body,{new:true} )
        return res.status(200).send({msg:"Done",updatedBlog})

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