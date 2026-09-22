function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        SAARTHIX AI
      </div>

      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">Features</a>
        <a href="#">About</a>
        <button className="login-btn">Login</button>
      </div>
    </nav>
  );
}

export default Navbar;