import './Navbar.css'
// import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import Login from './Login';
import Signup from './SignUp';

function Navbar() {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow_two,setModalShow_two]= useState(false);
  // const navigate= useNavigate();
  // function handleLogin(){
  //   navigate('/login');
  // }
  // function handleSignup(){
  //   navigate('/signup')
  // }
  return (

    <div className="navbar">
      <a href="/" className="logo"><img src="/gamerank_logo_white.png" alt="Logo" className="logo" /></a>
      <div className="search">
        <input
          className="search-input"
          type="text"
          name="search-input"
          required
        />
        <span className="material-symbols-outlined search-btn">
          search
        </span>
      </div>
      <div className="buttons">
        <button onClick={() => setModalShow(true)} className="login-btn">Login</button>
        <button onClick={()=> setModalShow_two(true)}className="register-btn">Register</button>
        {/* temporary profile button */}
        <button onClick={() => window.location.href="/Profile"}className="profile-btn">Profile</button>
      </div>
      <Login
        show={modalShow}
        onHide={()=>setModalShow(false)}
      />
      <Signup
        show={modalShow_two}
        onHide={()=>setModalShow_two(false)}
      />
    </div>
  )
}

export default Navbar