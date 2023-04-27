import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Protected(props) {

    const navigate  = useNavigate();
    let {Component} = props
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
    })


  return (
    <div>
      <Component/>
    </div>
  )
}
