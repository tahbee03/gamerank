import './Navbar.css';
import { useNavigate } from 'react-router-dom'; // useNavigate()
import { useEffect, useState } from 'react'; // useEffect(), useState()
import Login from '../Login/Login.jsx'; // <Login />
import Register from '../Register/Register.jsx'; // <Register />

function Navbar() {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow_two, setModalShow_two] = useState(false);
  const [input, setInput] = useState(""); // State for search input
  const [message, setMessage] = useState(null); // State for potential search error messages
  const [isInvalid, setIsInvalid] = useState(false); // State for search input validity
  const [isFocused, setIsFocused] = useState(false); // State for whether the input field is focused or not
  const user = sessionStorage.getItem("user");

  // NOTE: A focus state was used instead of the focus pseudo class in order to influence other components in the navbar

  useEffect(() => {
    // Remove focus if another element on the page is clicked
    function clickFocus(e) {
      if (e.target.id === "search-input") setIsFocused(true);
      else {
        setIsFocused(false);
        setIsInvalid(false);
        setMessage(null);
      }
    }

    // Remove focus if the ESC key is pressed
    function keyFocus(e) {
      if (e.key === "Escape") {
        setIsFocused(false);
        setIsInvalid(false);
        setMessage(null);
        document.getElementById("search-input").blur(); // Remove focus from input field
      }
    }

    // Event listeners
    window.addEventListener("click", clickFocus);
    window.addEventListener("keydown", keyFocus);

    // Cleans up event listeners when the component unmounts to avoid redundant calls
    return () => {
      window.removeEventListener("click", clickFocus);
      window.removeEventListener("keydown", keyFocus);
    };
  });

  const navigate = useNavigate(); // Needed to redirect to another page

  function handleLogout() {
    sessionStorage.removeItem("user"); // Removes user from browser session storage
    navigate("/"); // Navigage to home page
  }

  // Input validation for search input
  function validate(value) {
    const limit = 20;

    if (value.length < 1) {
      setIsInvalid(true);
      setMessage("Search input cannot be empty.");
    }
    else if (value.length > limit) {
      setIsInvalid(true);
      setMessage(`Search input cannot be longer than ${limit} characters.`);
    }
    else if (!value.match(/^[a-zA-Z0-9]+$/g)) {
      setIsInvalid(true);
      setMessage(`Your search input contains invalid characters.`);
    }
    else {
      setIsInvalid(false);
      setMessage(null);
      setInput(value);
    }
  }

  // Redirect to search page once input is accepted
  function handleSearch() {
    window.location.href = `/Search?input=${input}`;
  }

  return (
    <div className="navbar">
      <a href="/" className="logo"><img src="/gamerank_logo_white.png" alt="Logo" className="logo" /></a>
      <div className="search">
        <input
          id="search-input"
          className={`search-input${(isInvalid) ? " invalid-input" : ""}${(isFocused) ? " focused" : ""}`}
          type="text"
          name="search-input"
          autoComplete="off"
          onChange={(e) => validate(e.target.value)}
          onFocus={(e) => validate(e.target.value)}
        />
        {(message) && (
          <div className="search-error">
            <p>{message}</p>
          </div>
        )}
        <button id="search-btn" className="search-btn" onClick={handleSearch} disabled={(isInvalid || !isFocused)}>
          <span className="material-symbols-outlined">
            search
          </span>
        </button>
      </div>

      <div className="buttons">
        {(user) && (
          <>
            <button onClick={() => window.location.href = "/TopReviewers"} className="topreview-btn">Top Reviewers</button>
            <button onClick={() => window.location.href = `/Profile/${JSON.parse(user).username}`} className="profile-btn">Profile &#183; <span className="username-nav">{JSON.parse(user).username}</span></button>
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