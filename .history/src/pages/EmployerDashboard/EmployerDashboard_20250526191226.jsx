// EmployerDashboard.jsx
import { Link } from 'react-router-dom';
import './EmployerDashboard.css';

export default function EmployerDashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome to Your Dashboard!</h1>
        <p className="dashboard-subtitle">Manage your job posts and applications easily.</p>

        <div className="dashboard-cards">
          <Link to="/employer/jobs/create" className="dashboard-card">
            <h2>Create Job</h2>
            <p>Post a new job listing for candidates.</p>
          </Link>

          <Link to="/employer/jobs" className="dashboard-card">
            <h2>View Jobs</h2>
            <p>See all your active and past job posts.</p>
          </Link>

          <Link to="/employer/dashboard/edit-profile" className="dashboard-card">
            <h2>Edit Profile</h2>
            <p>Update your employer profile details.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
