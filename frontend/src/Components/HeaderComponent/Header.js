import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const user = localStorage.getItem("user");
  const[error,setError]=useState(false)
  // console.log(user)
  const navigate = useNavigate();
  function Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }
  function popup(){
      setError("Please login first")
      setTimeout(()=>{
        setError(false)
      },500)
  }


  return (
    <div>
      <nav className="navbar">
        {/* <ul> */}
        {localStorage.getItem("token") ? (
          <><span className="user-name">Welcome &nbsp; {user}</span>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blogs">My Blogs</Link>
            </li>
            <li>
              <Link to="/addblog">
                Add Blog
              </Link>
            </li>
            <li>
              <Link to="/" onClick={Logout}>
                Logout
              </Link>
            </li>
          </ul>
          </>
        ) : (
          <><span className="user-name" style={{fontSize:'1.6rem'}}><i>Blogeenix</i></span>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login" onClick={popup}>Add Blog</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul> 
            </>
        )}
      </nav>
      {error ? <div className='popup'><span>{error}</span></div> :''}
    </div>
  );
}
