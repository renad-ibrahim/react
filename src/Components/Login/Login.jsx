import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../../../public/images/1.jpg'
import styles from "./Login.module.css";
import { toast } from 'react-toastify';

export default function Login() {
  const [id , idupdate] = useState('');
  const [password , passwordupdate] = useState("");

  const navigate = useNavigate()

useEffect(()=>{
  sessionStorage.clear();
})

  const ProceedLogin = (e)=>{
    e.preventDefault();
    console.log("done");
    if(validate()){
      console.log("done");
      fetch("http://localhost:3001/users/"+id).then((res)=>{
        return res.json();
      }).then((response)=>{
        console.log(response);
        if(Object.keys(response).length === 0){
          toast.error("Plaese enter valid user name")
        }
        else{
          if(response.password === password){
            toast.success("Success");
            sessionStorage.setItem("username" , id)
            navigate('/')
          }else{
            toast.error("please enter valid credintials")
          }
        }
      })
      .catch((err)=>{
        toast.error("Login Faild due to :" +err.message)
      })
    }
  }
  const validate=()=>{
    let result = true;
    if(id==='' || id === null){
      result = false;
      toast.warning('PLease Enter User name ')
    }
    if(password==='' || password === null){
      result = false;
      toast.warning('PLease Enter Password ')
    }
    return result;
  }
  return (
    <div className='container '>
    <h2 className={styles.headerTitle}>Welcome Back</h2>
        <div className='row align-items-center'>
          <div className='col-lg-6 text-center'>
              <img src={loginImage} className={styles.loginImage}/>
          </div>
          <div className='col-lg-6'>
              <form onSubmit={ProceedLogin}>
              <div className='form-group my-2'>
                <label>User name <span className='errmsg text-danger text-danger'>*</span></label>
                <input value={id} onChange={e=>idupdate(e.target.value)}  type='text' className='form-control' />
              </div>
              <div className='form-group my-2'>
                <label>Password <span className='errmsg text-danger'>*</span></label>
                <input value={password} onChange={e=>passwordupdate(e.target.value)}  type='password' className='form-control' />
              </div>
              <div className='form-group text-center my-3'>
              <button type='submit' className={styles.registerButton} >Login</button>
              <p className='my-3'>Create an account? <Link to={'/registeration'}>Sign Up</Link></p>
              </div>
              </form>
          </div>
        </div>
    </div>
  )
}
