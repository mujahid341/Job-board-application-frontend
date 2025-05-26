import { Link } from 'react-router-dom';
import './EmployerDashboard.css';

export default function EmployerDashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to Your Dashboard!</h1>
      <p className="dashboard-subtitle">Manage your job postings and take control of your hiring process.</p>

      <div className="dashboard-buttons">
        <Link to="/employer/jobs/create" className="dashboard-btn create-btn">
          ➕ Create Job
        </Link>
        <Link to="/employer/jobs" className="dashboard-btn view-btn">
          👀 View Jobs
        </Link>
        <Link to="/employer/jobs/edit" className="dashboard-btn update-btn">
          ✏️ Update Job
        </Link>
        <Link to="/employer/jobs/delete" className="dashboard-btn delete-btn">
          ❌ Delete Job
        </Link>
      </div>
    </div>
  );
}
