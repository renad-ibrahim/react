import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

function Edit() {
  const {empid} =useParams();

  useEffect(()=>{
    fetch("http://localhost:8000/posts/"+empid)
    .then((res)=>{
        return res.json()
    })
    .then((result)=>{
        idChange(result.id)
        titleChange(result.title)
        contentChange(result.content)
    }).catch((err)=>{
        console.log(err.message);
    })
  },[])


  const[id , idChange]=useState("")
  const[image , imageChange]=useState("")
  const[title , titleChange]=useState("")
  const[content , contentChange]=useState("")
  const[validation , valChange]=useState(false)
  const navigate = useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log({id,image,title,content});
    const empData={id,image,title,content};

    fetch("http://localhost:8000/posts/"+empid ,{
      method:"PUT",
      headers:{"content-type" : "application/json"},
      body:JSON.stringify(empData)
    }).then((res)=>{
      alert("saved")
      navigate('/')
  })
  }
  return (
    <>
      <div className='container'>
      <h1 className='text-center my-5'>Update Post</h1>
      <div className='offset-3 col-lg-6 col-md-8 col-sm-10 update-form'>
      <form onSubmit={handleSubmit}>
        <div className='form-group my-3'>
          <label>ID</label>
          <input disabled value={id} className='form-control'  type='text'/>
        </div>
        <div className='form-group my-3'>
          <label>Image</label>
          <input  value={image} onChange={e=>imageChange(e.target.value)} className='form-control'  type='file'/>        
        </div>
        <div className='form-group my-3'>
          <label>title</label>
          <input required value={title} onMouseDown={e=>{valChange(true)}} onChange={e=>titleChange(e.target.value)} className='form-control'  type='text'/>
          {title.length===0 && validation && <span className='text-danger'>please Enter A name</span>}        
        </div>
        <div className='form-group my-3'>
          <label>content</label>
          <input  value={content} onChange={e=>contentChange(e.target.value)} className='form-control'  type='text'/>
        </div>
        <div className='form-group my-3'>
          <button className='btn btn-save me-3' type='submit'>Save</button>
          <button className='btn btn-back' ><Link to='/' className='text-light text-decoration-none'>Back</Link></button>

        </div>
      </form>
      </div>
      </div>
    </>
  )
}

export default Edit