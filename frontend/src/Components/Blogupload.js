import React, { useState } from 'react'
import axios from 'axios'
import './Blogupload.css'
import { useNavigate } from 'react-router-dom'
export default function Blogupload() {

  const navigate =useNavigate()

  const user =localStorage.getItem("user")

    const [image,setImage]=useState()
    const [title,setTitle]=useState()
    const[description,setDescription]=useState()
    const [category,setCategory]=useState()
    const[error,setError]=useState(false)
    const [success ,setSuccess]=useState(false)

    const closeSuccess =()=>{
        setSuccess(false)
        navigate('/')
    }

    const closeError=()=>{
      setTimeout(()=>{
        setError(false)
       },1500)
    }  
 
    const onInputChange =(e)=>{
        setImage(e.target.files[0])     
    }
     
    const upload= async(e)=>{
        e.preventDefault();
      
        if(!title || title.trim().length<4 || !/^[A-Za-z]/.test(title) ){
          setError('enter title')
          closeError()
        }
        else if(!image ){
          setError('enter image')
          closeError()
        }
        else if(image && !(/(gif|jpe?g|png)$/).test(image.name.split('.').pop())){
          setError('Please choose image only')
          closeError()
        }
        else{
        const formData =new FormData();
        formData.append('image',image)
        formData.append('title',title)
        formData.append('description',description)
        formData.append('category',category)
        formData.append('authorName',user)


        const config ={
            headers:{
                "Content-Type":"multipart/form-data",
                Accept: 'application/json',
                authorization: localStorage.getItem('token')
                },
        }

        const url ='http://localhost:4000/addBlog';

        axios.post(url,formData,config).then((res)=>{
          setSuccess('Done , You blog is posted')
        }).catch((err)=>{
          setError(error)
            console.log(err.response)
        })

        // let data = await fetch('/addBlog', config)
      }
    }
  
  return (    
    <div>
    <div className='postBlog-container'>
    <div className='blog-form'>
      <form method='post' onSubmit={upload}>
      {error && <div id='post-error'><div >{error}</div></div> }
      {success && <div id='post-success'><div id='success-msg'><span>{success}</span> <button onClick={closeSuccess}>Ok</button></div></div> }


      <h1>Add new Blog</h1>
      <input type="text" name="title" id="title" placeholder='Title' onChange={e=>{
        const{value}=e.target;
        setTitle(value)
      }}/>
      <input type="text" name="category" id="category" placeholder='Category' onChange={e=>{
        const{value}=e.target;
        setCategory(value)
      }}/>
     <textarea name="description" id='description' placeholder='Summery' onChange={e=>{
        const{value}=e.target;
        setDescription(value)
      }}></textarea>
      <div><input type="file" name="image" id="image" onChange={onInputChange} accept="image/*"/></div>
      <div className="image-preview-box" placeholder='preview'>
     {image ?  <img src={URL.createObjectURL(image)} alt='preview' id='image-preview'/> : <h3>Image priview</h3>}
     </div>
      <button type='submit' id='post-blog'>Post Blog</button>
      </form>
    </div>
      </div>
    </div>
  )
}
