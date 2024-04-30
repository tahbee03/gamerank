import './Navbar.css';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import TopReviewers from '../TopReviewers/TopReviewers.jsx';
function Navbar() {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow_two, setModalShow_two] = useState(false);
  const user = sessionStorage.getItem("user");

  const navigate = useNavigate(); // Needed to redirect to another page

  function handleLogout() {
    sessionStorage.removeItem("user"); // Removes user from browser session storage
    navigate("/");
  }

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

        {(user) && (
          <>
            <button onClick={() => window.location.href = "/TopReviewers"} className="topreview-btn">Top Reviewers</button>
            <button onClick={() => window.location.href = "/Profile"} className="profile-btn">Profile</button>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
        {(!user) && (
          <>
            <button onClick={() => window.location.href = "/TopReviewers"} className="topreview-btn">Top Reviewers</button>
            <button onClick={() => setModalShow(true)} className="login-btn">Login</button>
            <button onClick={() => setModalShow_two(true)} className="register-btn">Register</button>
          </>
        )}
      </div>
      <Login
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Register
        show={modalShow_two}
        onHide={() => setModalShow_two(false)}
      />
    </div>
  )
}

export default Navbar