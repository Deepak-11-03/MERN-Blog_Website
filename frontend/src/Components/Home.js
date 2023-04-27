import React,{useEffect,useState} from 'react'
import Loader from './misc/Loader'
import './Home.css'
import { useNavigate } from 'react-router-dom';

export default function Home() {
   
  const [blogs, setBlogs] = useState([]);
  const[loading ,setLoading]=useState(false)
  const navigate =useNavigate();

  useEffect(() => {
    getBlogs();
  },[]);

  const getBlogs = async () => {
    try {
      let data = await fetch('https://blogenix.onrender.com/getBlogs')
      data = await data.json();
      setLoading(true)
      setBlogs(data) 
    } catch (err) {
      alert(err)
    }
  };

  const details = (id)=>{
    navigate(`/blogs/details/${id}`)
  }


  return (
    <div className='homePage'>
     {/* <h1>All Blogs</h1>
      <hr /> */}
     <div className='allBlogs'>
     {loading ? <>
      {blogs.map((item) => 
      <div className="blog-container" key={item._id} onClick={()=>details(item._id)}>
      <div id='blog-image'><img src={item.image} alt="" /></div>
      <br />
                    <div className="contentContainer">
                    <h4>Title : {item.title}</h4>
                    <h4>Category : {item.category}</h4>
                    <div id='description'>
                    <p ><b>Description :</b> {item.description}</p>
                    <br /><br />
                    <h4>Author :  {item.authorName}</h4>
                    </div>
                    </div>
                    </div>
                )}</>: <Loader/>}
                {blogs.length === 0 && <h4>No blog uploaded yet</h4> }
     </div>
    </div>
  )
}
