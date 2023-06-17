import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { auth } from '../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import {signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
//one of the hook of firebase to make our job easy with firebase
function Navbar() {
    const nav= useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user] = useAuthState(auth);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const logout = async ()=>{
    await signOut(auth);
    nav("/");
  }
  //to include javascript in return part we always use {}
  return (
    <div className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
      <div className="navbar-header">
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="burger-icon"></span>
        </button>
      </div>
      <div className="navbar-links">
        {user && <Link className="icon" to="/home">
          Home
        </Link> }
        {!user 
        ? 
        (<Link className="icon" to="/">
          Login</Link>) 
        : 
        (<Link className="icon" to="/createpost">Create Post</Link>)
        }
      </div>
      <div className='bottom'>
        {user && (<>
            <h6 className='last-item'>{auth.currentUser.displayName}</h6>
            <img className='icons' src={auth.currentUser?.photoURL || "U"} width="30px" height="30px"/>
            <button className='buttonuser' onClick={logout}>LogOut</button>
        </>)}
      </div>
    </div>
  );
  //here the <></>fragment tag is used to include a list of tags into one and apply the condition on them as whole
}

export default Navbar;