import { useEffect, useState } from 'react';
import { getJobById } from '../../services/jobApi';
import { useParams } from 'react-router-dom';

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getJobById(id);
        setJob(res.data);
      } catch (err) {
        console.error('Failed to load job details:', err);
        setError('Failed to load job details.');
      }
    };
    fetchJob();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!job) return <p>Loading...</p>;

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.location}</p>
      <p>{job.skills}</p>
      <p>{job.description}</p>
    </div>
  );
}
