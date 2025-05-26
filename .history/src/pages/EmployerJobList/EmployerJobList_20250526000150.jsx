import './EmployerJobList.css';
import { useEffect, useState } from 'react';
import { getMyJobs, deleteJob } from '../../services/jobApi';
import { Link } from 'react-router-dom';

export default function EmployerJobList() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await getMyJobs();
      setJobs(res.data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      fetchJobs(); // refresh after delete
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="job-list-container">
      <h2 className="text-xl font-semibold mb-4">My Jobs</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <div>
              <h3 className="text-lg font-bold">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.location}</p>
              <p className="text-sm">{job.skills || job.skill}</p>
            </div>
            <div className="button-group">
              <Link to={`/employer/jobs/edit/${job.id}`} className="edit-btn">Edit</Link>
              <button className="delete-btn" onClick={() => handleDelete(job.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
