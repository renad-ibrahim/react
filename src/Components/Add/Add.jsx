import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Add() {

  const[id , idChange]=useState("")
  const[image , imageChange]=useState("")
  const[title , titleChange]=useState("")
  const[content , contentChange]=useState("")
  const[validation , valChange]=useState(false)

  const navigate = useNavigate();
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log({id,image,title,content});
    const empData={image,title,content};

    fetch("http://localhost:8000/posts" ,{
      method:"POST",
      headers:{"content-type" : "application/json"},
      body:JSON.stringify(empData)
    }).then((res)=>{
      alert("saved")
      navigate('/')
  })
  }

  return (
    <>
      <div className='container '>
      <h1 className='my-5 text-center' >Create New Post</h1>
      <div className='offset-3 col-lg-6 col-md8 col-sm-10 create-form'>
        <form onSubmit={handleSubmit}>
          <div className='form-group my-3'>
            <label>Id</label>
            <input disabled value={id} className='form-control'  type='text'/>
          </div>
          <div className='form-group my-3'>
            <label>image</label>
            <input value={image} onChange={e=>imageChange(e.target.value)} className='form-control'  type='file'/>
          </div>
          <div className='form-group my-3'>
            <label>Title</label>
            <input required value={title} onMouseDown={e=>{valChange(true)}} onChange={e=>titleChange(e.target.value)} className='form-control'  type='text'/>
            {title.length===0 && validation && <span className='text-danger'>please Enter Title </span>}        
          </div>
          <div className='form-group my-3'>
            <label>Write Content of the post</label>
            <input value={content} onChange={e=>contentChange(e.target.value)} className='form-control'  type='text'/>
          </div>
          <div className='form-group my-3'>
            <button className='btn btn-create me-3 text-light' type='submit'>Create</button>
            <button className='btn btn-cancel' ><Link to='/' className='text-light text-decoration-none'>Cancel</Link></button>
          </div>
        </form>
      </div>
      </div>
    </>
  )
}

export default Add