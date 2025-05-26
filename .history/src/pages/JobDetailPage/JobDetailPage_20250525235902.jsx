import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById } from '../../services/jobApi';
import './JobDetailPage.css';

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getJobById(id);
        setJob(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch job:', err);
        setError('Failed to load job details.');
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return <div className="job-detail-container">Loading...</div>;
  }

  if (error) {
    return <div className="job-detail-container text-red-500">{error}</div>;
  }

  if (!job) {
    return <div className="job-detail-container">No job found.</div>;
  }

  return (
    <div className="job-detail-container">
      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-2">{job.location}</p>
      <p className="text-sm mb-4">{job.skill || job.skills}</p>
      <p>{job.description}</p>
    </div>
  );
}
