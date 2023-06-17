import React from 'react'
import { auth,provider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import './Login.css'
//this is one of the methods to signin which we are currently using
function Login () {
    const navigate= useNavigate();
    const signinwithgoogle = async () =>{
        const result = await signInWithPopup(auth,provider);
        //console.log(result);
        navigate("/home");
        //takes our two arguments that we created in firebase.js
    };
  return (
    <div className='base'>
        <div className='pagedive'>
        <p className='text'>Sign in With Google to Continue</p>
        <button className='s-button' onClick={signinwithgoogle}>Sign in</button>
        </div>
    </div>
  )
}

export default Login
