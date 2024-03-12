import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

function Details() {
  const {empid} =useParams();
  const [empData , empDataChange] = useState({});

  useEffect(()=>{
    fetch("http://localhost:8000/posts/"+empid)
    .then((res)=>{
        return res.json()
    })
    .then((result)=>{
        empDataChange(result);
    }).catch((err)=>{
        console.log(err.message);
    })
  },[])
  return (
    <div className='container mt-5'>
    <img src={empData.image} className='display-image' />
      <p className='my-2'><strong> Title :</strong> {empData.title}</p>
      <p className='my-2'><strong> Content :</strong> {empData.content}</p>
      <button className='my-3 btn btn-details-back'><Link to='/' className='text-light text-decoration-none'>Back home</Link></button>
    </div>
  )
}

export default Details