import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Navbar() {
    const [showNav , setShowNav] = useState(false);
    const location = useLocation();
    useEffect(()=>{
        if(location.pathname === '/login' || location.pathname==='/registration'){
            setShowNav(false);
        }else{
            setShowNav(true)
        }
    },[location])
  return (
    <>
      {showNav && 
        <nav className="navbar navbar-expand-lg navbar-light ">
                <div className="container">
                    <a className="navbar-brand text-light" href="#">Noticioso</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav m-auto mb-2 mb-lg-0 mt-0">
                            <li className="nav-item me-3">
                                <Link to='/' className='text-decoration-none text-light'>Home</Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link to='/' className='text-decoration-none text-light'>About</Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link to='/' className='text-decoration-none text-light'>Contact us</Link>
                            </li>
                        </ul>
                        <ul className='list-unstyled'>
                           <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/login">Logout</Link></li>
                                    <li><a className="dropdown-item" href="#">My Profile</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        
      }
    </>
  )
}