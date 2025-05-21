import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const isLoggedIn = false; // use true to test logout view

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">XcelerateIT</Link>
      <div className="nav-links">
        {isLoggedIn ? (
          <>
            <Link to="/employer/dashboard">Dashboard</Link>
            <button className="nav-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
