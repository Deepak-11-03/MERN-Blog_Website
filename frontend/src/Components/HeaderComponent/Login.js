import React, { useState ,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import './Form.css'
// import axios from 'axios'

export default function Login() {
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/dashboard')
    }
  })
  const [error,setError]=useState(false)

  const closeError=()=>{
    setTimeout(()=>{
      setError(false)
     },1500)
  } 
  

  const[login,setLogin] =useState({
    email:"" ,password:""
  })
  

  let name ,value;
  const handleInput =(e)=>{
      name=e.target.name;
      value=e.target.value;
      // console.log(name,value)
      setLogin({...login,[name]:value})
  }

  const userLogin = async(e)=>{
    e.preventDefault();
    try {
      const {email,password}=login

      if(email==="" ||password==="" ){
        setError('Enter Details')
        closeError()
      }

      else{
      let data= await fetch( "/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem('token')

      },
      body: JSON.stringify({
       email, password
    }),
          });
          data =await data.json()
        if(data.token){
          localStorage.setItem("user", data.user)
          localStorage.setItem("token", data.token)
          navigate('/')
        }
        else{
          setError(data.message)
          closeError()
        }
      }
        
    } catch (error) {
         setError(error)
    }
  }


  return (
    <div>
    
       <div className="container">
       {error?<div id='error'><span>{error}</span>  </div>:''}
      <form>
        <h1>Welcome back !</h1>
        <br />
        <input type="email" name='email' placeholder='Email *' autoFocus autoComplete='off' required value={login.email} onChange={handleInput}/>
        <input type="password" name='password' placeholder='Password *' required value={login.password}   onChange={handleInput}/>
        <br />
        <button onClick={userLogin}>Login</button>
      </form>
      </div>
    </div>
  )
}
