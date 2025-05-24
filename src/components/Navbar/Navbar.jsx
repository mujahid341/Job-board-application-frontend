import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">XcelerateIT</Link>
      <div className="nav-links">
        {isLoggedIn ? (
          <>
            <Link to="/employer/dashboard">Dashboard</Link>
            <button className="nav-btn" onClick={handleLogout}>Logout</button>
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
