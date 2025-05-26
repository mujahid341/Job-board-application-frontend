import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home-container">
      <h1 className="text-3xl font-bold mb-4">Welcome to XcelerateIT Job Board</h1>
      <p className="mb-6 text-lg">Your gateway to find jobs, post opportunities, and build your career.</p>

      <div className="button-group">
        <Link to="/register" className="home-btn">Register</Link>
        <Link to="/login" className="home-btn">Login</Link>
      </div>
    </div>
  );
}
