const express=require('express')
const router=express.Router()
const userController =require('./controller/userController')
const blogController =require('./controller/blogController');
const auth =require('./auth/auth')


router.post('/register' ,userController.register )
router.post('/login',userController.login)
router.get('/verify',userController.verify)
router.post('/addBlog' ,auth.auth, blogController.addBlog)
router.get('/getBlogs' , blogController.getBlogs)
router.get('/blogs' ,auth.auth, blogController.userBlogs)
router.delete('/blogs/:id' ,auth.auth, blogController.deleteBlog)

module.exports =router
           