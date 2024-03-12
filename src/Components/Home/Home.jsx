import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

export default function Home() {
  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
    const navigate = useNavigate();
    const remove = (id) => {
        if (window.confirm("Are U SUre that UU wanna to remove")) {
            fetch("http://localhost:8000/posts/" + id, {
                method: "DELETE",
            }).then((res) => {
                // alert("reomved successfuuullyyyy");
                toast.success("Post Removed Succefully")
                location.reload()
            })
        }
    }
    const loadDetails = (id) => {
        navigate('/details/' + id)
    }
    const loadEdit = (id) => {
        navigate('/edit/' + id)
    }
    const [empData, empDataChange] = useState(null)

    useEffect(() => {
        fetch("http://localhost:8000/posts")
            .then((res) => {
                return res.json()
            })
            .then((result) => {
                empDataChange(result);
            }).catch((err) => {
                console.log(err.message);
            })
    }, [])


    return (
        <>
            <div className='container'>
                <div className='row justify-content-end my-5'>
                    <button className='btn btn-add-post col-sm-2'>
                        <Link to='/add' className='text-decoration-none text-light'>Add New Post</Link>
                    </button>
                </div>
                <div className='row'>
                    {empData && 
                    empData.map(item=>(
                        <div key={item.id} className='col-lg-3 col-md-6 colsm-12 my-3'>
                        <div className="card" >
                            <img src={item.image} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text post-content">{item.content}</p>
                                <div className='d-flex justify-content-between'>
                                  <button className='btn btn-details p-0' onClick={() => { loadDetails(item.id) }}>
                                    <Link to='/details'>Read More</Link>
                                  </button>
                                  <div>
                                    <button className='btn btn-delete' onClick={() => { remove(item.id) }}>
                                      <FontAwesomeIcon icon={faTrash} onClick={showToastMessage}></FontAwesomeIcon>
                                    </button>
                                    <button className='btn btn-edit' onClick={() => { loadEdit(item.id) }}>
                                      <Link to='/edit'><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></Link>
                                    </button>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
    )
}
