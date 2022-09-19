import React,{useEffect,useState} from 'react'
// import { AiFillDelete,AiFillEdit } from "react-icons/ai";
import Loader from './Loader'
import ScrollButton from './ScrollButton'
import './Home.css'
// import axios from 'axios';

export default function Home() {
   
  const [blogs, setBlogs] = useState([]);
  const[loading ,setLoading]=useState(false)

  useEffect(() => {
    getBlogs();
  },[]);

  const getBlogs = async () => {
    try {
      let data = await fetch('/getBlogs')
      data = await data.json();
      setLoading(true)
      setBlogs(data) 
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className='homePage'>
     {/* <h1>All Blogs</h1>
      <hr /> */}
     <div className='allBlogs'>
     {loading ? <>
      {blogs.map((item) => 
      <div className="blog-container" key={item._id}>
      <div id='blog-image'><img src={item.image} alt="" /></div>
                    <h4>Title : {item.title}</h4>
                    <h4>Category : {item.category}</h4><br />
                    <div id='description'>
                    <p ><b>Description :</b> {item.description}</p>
                    <br /><br />
                    <h4>Author :  {item.authorName}</h4>
                    </div>
                    </div>
                )}</>: <Loader/>}
     </div>
     <ScrollButton/>
    </div>
  )
}
