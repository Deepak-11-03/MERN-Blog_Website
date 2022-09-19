import React,{useEffect,useState} from 'react'
import Loader from './Loader';
import { AiFillDelete,AiFillEdit } from "react-icons/ai";
import ScrollButton from './ScrollButton';
import './Home.css'

export default function UserBlog() {
   
    const [userBlog, setUserBlogs] = useState([]);
    const[loading ,setLoading]=useState(false)
    const [error,setError]=useState(false)
    const [success ,setSuccess]=useState(false)
    
    useEffect(() => {
        userBlogs();
    },[]);
    
    const removeSuccess =()=>{
      setTimeout(() => {
        setSuccess(false)
      }, 2000);
    }
  
    const userBlogs = async () => {
      try {
        let data = await fetch('/blogs',{
          headers:{
            authorization: localStorage.getItem('token')
            }
        })
        data= await data.json()
        if(data){
        setLoading(true)
        setUserBlogs(data)
        }
        else{
            setError('something wrong')
        }
      } catch (err) {
        console.log(err);
      }
    }


    // const updateBlog =async(id)=>{
    //   try {
    //     // let data =await axios.put(`http://localhost:4000/blogs/${id}`,config)
    //     console.log(setUserBlogs)
    //   } catch (error) {
    //     setError(error)
    //   }
    // }

    const blogDelete = async(id)=>{
      try {
       let data = await fetch(`/blogs/${id}`,{
        method:"DELETE",
        headers:{
          authorization: localStorage.getItem('token')
          },

       })
        if(data){
          userBlogs()
          setSuccess('Successfully Deleted')
          removeSuccess()
        }
        else{
          alert('not done')
        }
      } catch (error) {
        console.log(error)
      }
    }
   
  return (
      <div className='homePage'>
     <h1>My Blogs</h1>
      <hr />
      {error?<div id='error'><span>{error}</span>  </div>:''}
      {success ?<div id='dlt-success'><span>Successfully Deleted</span> </div> :""}
     <div className='allBlogs'>
     {loading ? <> {userBlog.map((item) => 

      <div className="blog-container" key={item._id}>
      <div  style={{fontSize: "1.3rem"}}>
      <AiFillDelete title='Delete' onClick={()=>blogDelete(item._id)} style={{float: "right", padding:'.5rem' , cursor:"pointer",color:'#e73535'}}/>
      <AiFillEdit title='Edit' style={{float: "right" , padding:'.5rem' , cursor:"pointer"}}/>
      </div>

      <div id='blog-image'><img src={item.image} alt="" /></div>
                    <h4>Title : &nbsp;{item.title}</h4>
                    <h4>Category :&nbsp; {item.category}</h4><br />
                    <div id='description'>
                    <p ><b>Description :</b>&nbsp; {item.description}</p>
                    <br /><br />
                    <span style={{fontWeight:700}}>Author :  {item.authorName}</span> 
                    <span style={{float: "right"}}>{item.publishedAt}</span>
                    </div>
                    </div>
                )} </> : <Loader/>}    
     </div>
     <ScrollButton/>
    </div>
  )
}
