import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Blogupload.css'
import Loader from '../misc/Loader'
import imageUpload from '../../utils/CloudinaryUpload'

function Blogupdate() {
    let { id } = useParams();
    const navigate = useNavigate()
    const [blog, setBlog] = useState({
        title: "",
        category: "",
        description: "",
        image: ""
      });
      const [files, setFiles] = useState("");
      const [loading,setLoading]= useState(false)
      const [error, setError] = useState(false);
      const [success, setSuccess] = useState(false);
  
  useEffect(()=>{           // get blog from database
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

  const closeSuccess = () => {
    setSuccess(false);
    navigate("/");
  };

  const closeError = () => {
    setTimeout(() => {
      setError(false);
    }, 2000);
  };
  const handleInput =(e)=>{
    setBlog({...blog,[e.target.name]:e.target.value})
  }

  // update api 

  const upload = async (e) => {
    e.preventDefault();
    if (!blog.title || blog.title.trim().length < 4 || !/^[A-Za-z]/.test(blog.title)) {
      setError("Enter title");
      closeError();
    }
    else if (!blog.category || blog.category.trim().length < 4 || !/^[A-Za-z]/.test(blog.category)) {
      setError("Enter category");
      closeError();
    } 
    else if (!blog.description || blog.description.trim().length < 10 || !/^[A-Za-z]/.test(blog.description)) {
      setError("Enter description about blog");
      closeError();
    } 
    else if (!files) {
      setError("Please upload image");
      closeError();
    } else if (files && !/(gif|jpe?g|png)$/.test(files.name.split(".").pop())) {
      setError("Please choose image only");
      closeError();
    } else {
      setLoading(true)
      const url = await imageUpload(files);  // getting image url from cloudinary
      blog.image = url;
      
      let data = await fetch(`http://localhost:4000/update-blog/${id}`, {
        mode: "cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(blog),
      });
      if (data.ok) {
        setSuccess("Done , You blog is posted");
        setLoading(false)
      } else {
        setError(error);
        setLoading(false)
      }
    }
  };

  return (
    <div>
      {loading && <Loader/>}
      <div className="postBlog-container">
        <div className="blog-form">
          <form method="post" onSubmit={upload}>
            {error && (
              <div id="error">
                <div>{error}</div>
              </div>
            )}
            {success && (
              <div id="post-success">
                <div id="success-msg">
                  <span>{success}</span>{" "}
                  <button onClick={closeSuccess}>Ok</button>
                </div>
              </div>
            )}

            <h1>Update Blog details</h1>
            <br />
           <div className="input">
           <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              value={blog.title}
              onChange={handleInput}
            />
            <input
              type="text"
              name="category"
              id="category"
              placeholder="Category"
              onChange={handleInput}
              value={blog.category}
            />
           </div>
            <textarea
              name="description"
              id="description"
              placeholder="Summery"
              onChange={handleInput}
              value={blog.description}
            ></textarea>
            <div>
              <input
                type="file"
                name="image"
                id="image"
                onChange={(e)=>setFiles(e.target.files[0])}
                // value={blog.image}
                accept="image/*"
              />
            </div>
            <div className="image-preview-box" placeholder="preview">
              {files ? (
                <img
                  src={URL.createObjectURL(files)}
                  alt="preview"
                  id="image-preview"
                />
              ) : (
                <h3>Please upload new image</h3>
              )}
            </div>
            <button type="submit" id="post-blog">
              Update Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Blogupdate
