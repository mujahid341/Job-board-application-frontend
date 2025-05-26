import './EmployerJobList.css';
import { useEffect, useState } from 'react';
import { getMyJobs, deleteJob } from '../../services/jobApi';
import { useNavigate } from 'react-router-dom';

export default function EmployerJobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await getMyJobs();
      setJobs(res.data);
    } catch (err) {
      setError('Failed to load jobs.');
      console.error(err);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="job-list-container">
      <h2 className="text-xl font-semibold mb-4">My Jobs</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <div>
              <h3 className="text-lg font-bold">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.location}</p>
              <p className="text-sm">{job.skills}</p>
            </div>
            <div className="button-group">
              <button className="edit-btn" onClick={() => navigate(`/employer/jobs/edit/${job.id}`)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(job.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
