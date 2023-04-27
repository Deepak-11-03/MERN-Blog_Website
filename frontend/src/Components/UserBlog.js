import React,{useEffect,useState} from 'react'
import Loader from './misc/Loader';
import { AiFillDelete,AiFillEdit } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import './Home.css'

export default function UserBlog() {
   const navigate = useNavigate()
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
  
    const details = (id)=>{
      navigate(`/blogs/details/${id}`)
    }

    const blogUpdate =(id)=>{
      navigate(`/blogs/update/${id}`)
    }

    const userBlogs = async () => {
      try {
        let data = await fetch('https://blogenix.onrender.com/blogs',{
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
       let data = await fetch(`http://localhost:4000/blogs/${id}`,{
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
      <hr />
      {error?<div id='error'><span>{error}</span>  </div>:''}
      {success ?<div id='dlt-success'><span>Successfully Deleted</span> </div> :""}
     <div className='allBlogs'>
     {userBlog.length === 0 && <h3>No blog uploded</h3> }
     {loading ? <> {userBlog.map((item) => 

      <div className="blog-container" key={item._id}  >
      <div  style={{fontSize: "1.3rem"}}>
      <AiFillDelete title='Delete' onClick={()=>blogDelete(item._id)} style={{float: "right", padding:'.5rem' , cursor:"pointer",color:'#e73535'}}/>
      <AiFillEdit title='Edit' onClick={()=>blogUpdate(item._id)} style={{float: "right" , padding:'.5rem' , cursor:"pointer"}}/>
      </div>

      <div id='blog-image' onClick={()=>details(item._id)} ><img src={item.image} alt=""  /></div>
      <br />
      <div className="contentContainer" onClick={()=>details(item._id)}>
                    <h4>Title : {item.title}</h4>
                    <h4>Category : {item.category}</h4>
                    <div id='description'>
                    <p ><b>Description :</b> {item.description}</p>
                    <br /><br />
                    <h4>Author :  {item.authorName}</h4>
                    </div>
                    </div>
                    </div>
                )} </> : <Loader/>}    
     </div>
    </div>
  )
}
