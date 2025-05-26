import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyJobs, deleteJob } from '../../services/jobApi';
import './EmployerDashboard.css';

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      const res = await getMyJobs();
      setJobs(res.data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      setError('Failed to load jobs.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      fetchJobs();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to Your Dashboard!</h1>
      <p className="dashboard-subtitle">
        Manage your jobs, create new opportunities, and track your posted listings here.
      </p>

      <div className="dashboard-button-group">
        <Link to="/employer/jobs/create" className="dashboard-btn dashboard-btn-blue">
          Create New Job
        </Link>

        <Link to="/employer/jobs" className="dashboard-btn dashboard-btn-green">
          View My Jobs
        </Link>
      </div>

      {loading ? (
        <p className="dashboard-message">Loading jobs...</p>
      ) : error ? (
        <p className="dashboard-error">{error}</p>
      ) : jobs.length === 0 ? (
        <p className="dashboard-message">You have not posted any jobs yet.</p>
      ) : (
        <div className="dashboard-job-list">
          <h2 className="job-list-title">My Jobs</h2>
          <ul className="job-list">
            {jobs.map((job) => (
              <li key={job.id} className="job-item">
                <div className="job-info">
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-location">{job.location}</p>
                  <p className="job-skills">{job.skills}</p>
                </div>
                <div className="job-actions">
                  <Link to={`/employer/jobs/edit/${job.id}`} className="job-action-btn job-edit-btn">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(job.id)} className="job-action-btn job-delete-btn">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}