import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import './Blog.css'


export default function Blog() {
  let { id } = useParams();
  const [blog,setBlog]= useState({}) 

useEffect(()=>{
  const blogDetails = async()=>{
     let data = await fetch(`https://blogenix.onrender.com/blogs/details/${id}`,{
      method:"GET",
      headers:{
        authorization: localStorage.getItem('token')
        }
    })
     data =await data.json()
        setBlog(data)
  }
  blogDetails();
},[id])
 


  return (
    <div style={{padding: "1rem",backgroundColor:"rgb(239 239 239)", minHeight:"90vh"}}>
      <div className='singleBlog'>
      <h2>Title : {blog.title}</h2>
      <div id='image'><img src={blog.image} alt="blog " /></div>
      <h4>Category : {blog.category}</h4>
      <div>
      <p><b>Description :</b> {blog.description}</p>
      <br />
        <span>Author: {blog.authorName}</span>
      </div>
      </div>
    </div>
  )
}
