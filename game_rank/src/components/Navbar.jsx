import './Navbar.css'

function Navbar() {
  return (
    <div className="navbar">
      <img src="/gamerank_logo_white.png" alt="logo" className="logo" />
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
      <div className ="buttons">
        <button className="genres-btn">Genres</button>
        <button className="lists-btn">Lists</button>
        <button className="discounts-btn">Discounts</button>
      </div>
      <div className="buttons">
        <button className="login-btn">Login</button>
        <button className="register-btn">Register</button>
      </div>
    </div>
  )
}

export default Navbar