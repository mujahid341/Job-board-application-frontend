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
      fetchJobs();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <h2>My Jobs</h2>
      {jobs.map((job) => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <p>{job.location}</p>
          <p>{job.skills}</p>
          <Link to={`/employer/jobs/edit/${job.id}`}>Edit</Link>
          <button onClick={() => handleDelete(job.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
