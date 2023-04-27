import React, { useState } from "react";
import "./Blogupload.css";
import { useNavigate } from "react-router-dom";
import Loader from '../misc/Loader'
import imageUpload from "../../utils/CloudinaryUpload";


export default function Blogupload() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    authorName:user
  });
  const [files, setFiles] = useState("");
  const [loading,setLoading]= useState(false)
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

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
    setBlogDetails({...blogDetails,[e.target.name]:e.target.value})
  }

 
  const upload = async (e) => {
    e.preventDefault();
    if (!blogDetails.title || blogDetails.title.trim().length < 4 || !/^[A-Za-z]/.test(blogDetails.title)) {
      setError("Enter title");
      closeError();
    }
    else if (!blogDetails.category || blogDetails.category.trim().length < 4 || !/^[A-Za-z]/.test(blogDetails.category)) {
      setError("Enter category");
      closeError();
    } 
    else if (!blogDetails.description || blogDetails.description.trim().length < 10 || !/^[A-Za-z]/.test(blogDetails.description)) {
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
      blogDetails.image = url;
      
      let data = await fetch("https://blogenix.onrender.com/addBlog", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(blogDetails),
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

            <h1>Add new Blog</h1>
           <div className="input">
           <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              onChange={handleInput}
            />
            <input
              type="text"
              name="category"
              id="category"
              placeholder="Category"
              onChange={handleInput}
            />
           </div>
            <textarea
              name="description"
              id="description"
              placeholder="Summery"
              onChange={handleInput}
            ></textarea>
            <div>
              <input
                type="file"
                name="image"
                id="image"
                onChange={(e)=>setFiles(e.target.files[0])}
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
                <h3>Image preview</h3>
              )}
            </div>
            <button type="submit" id="post-blog">
              Post Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
