import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Registeration.module.css';
import loginImage from '../../../public/images/1.jpg'

export default function Regiseration() {
    const showToastMessage = () => {
        toast.success("Success Notification !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      };
    const navigate=useNavigate();

    const IsValidate=()=>{
      let isProceed = true;
      let errorMessage = "Please enter a valid "
      if(id===null || id===""){
        isProceed=false;
        errorMessage +='Username';
      }
      if(password===null || password===""){
        isProceed=false;
        errorMessage +=' and Password';
      }
      if(email===null || email===""){
        isProceed=false;
        errorMessage +=' and Email';
      }
      if(!isProceed){
        toast.warning(errorMessage)
      }
      // else{
      //   if(/^[a-zA-Z0-9]+@[a-zA-Z]+$/.test(email)){
          
      //   }else{
      //     isProceed=false;
      //     toast.warning('Please enter valid EMAIIL')
      //   }
      // }
      return isProceed;
    }
    // const formik = useFormik({
    //     initialValues: {
    //       id: '',
    //       password: '',
    //       email: '',
    //       phone: '',
    //       gender: '',
    //     },
    //     validationSchema: Yup.object({
    //       id: Yup.string().required('Required'),
    //       password: Yup.string().required('Required'),
    //       email: Yup.string().email('Invalid email').required('Required'),
    //       phone: Yup.string().required('Required'),
    //       gender: Yup.string().required('Required'),
    //     })
    // })
    const [id , idChange] = useState("");
    const [password , passwordChange] = useState("");
    const [email , emailChange] = useState("");
    const [phone , phoneChange] = useState("");
    const [gender , genderChange] = useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();
        let obj = {id,password,email,phone,gender};
        console.log(obj);
        if(IsValidate()){
        fetch("http://localhost:3001/users" , {
            method:"POST",
            body: JSON.stringify(obj)
        }).then((res)=>{
            toast.success('Registered Successfully')
            navigate('/login')
    })
    .catch((err)=>{toast.error('Registered faild'+err.message)})
       }
    }
  return (
    <div className='container '>
    <h2 className={styles.headerTitle}>Create Your New Account! </h2>
        <div className='row align-items-center'>
          <div className='col-lg-6 text-center'>
              <img src={loginImage} className={styles.loginImage}/>
          </div>
          <div className='col-lg-6'>
              <form onSubmit={handleSubmit}>
              {/* <div className='form-group'>
                <label>User Name <span className='errmsg'>*</span></label>
                <input {...formik.getFieldProps('id')} type="text" className="form-control" />
                {formik.touched.id && formik.errors.id ? (
                <div className="error text-danger">{formik.errors.id}</div>
              ) : null}           </div> */}
              <div className='form-group my-2'>
                <label>User name <span className='errmsg text-danger text-danger'>*</span></label>
                <input value={id} onChange={(e)=>{idChange(e.target.value)}}  type='text' className='form-control' />
              </div>
              <div className='form-group my-2'>
                <label>Password <span className='errmsg text-danger'>*</span></label>
                <input value={password} onChange={(e)=>{passwordChange(e.target.value)}}  type='password' className='form-control' />
              </div>
              <div className='form-group my-2'>
                <label>Phone Number</label>
                <input value={phone} onChange={(e)=>{phoneChange(e.target.value)}}  type='number' className='form-control' />
              </div>
              <div className='form-group my-2'>
                <label>Email <span className='errmsg text-danger'>*</span></label>
                <input value={email} onChange={(e)=>{emailChange(e.target.value)}}  type='email' className='form-control' />
              </div>
              <div className='form-group my-2'>
                <label>Gender </label><br></br>
                <input checked={gender==='male'} onChange={(e)=>{genderChange(e.target.value)}} type='radio' name='gender' value="male" />
                <label>Male</label><br></br>
                <input checked={gender==='female'} onChange={(e)=>{genderChange(e.target.value)}} type='radio' name='gender' value="female" />
                <label>Female</label>
              </div>
              <div className='form-group text-center my-3'>
                <button onClick={showToastMessage} type='submit' className={styles.registerButton}>Register</button>
                <p className='my-3'>Already have an account? <Link to='/login'>Sign In</Link></p>
              </div>
              </form>
          </div>
        </div>
    </div>
  )
}
