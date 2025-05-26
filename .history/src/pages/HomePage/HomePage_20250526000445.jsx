import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home-hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Welcome to <span className="highlight">XcelerateIT</span> Job Board
        </h1>
        <p className="hero-subtitle">
          Discover jobs, post opportunities, and shape your future with AI-powered hiring.
        </p>
        <div className="hero-buttons">
          <Link to="/register" className="hero-btn">Get Started</Link>
          <Link to="/login" className="hero-btn-outline">Login</Link>
        </div>
      </div>
    </div>
  );
}
