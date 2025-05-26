import './JobDetailPage.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById } from '../../services/jobApi';

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJob = async () => {
      try {
        const res = await getJobById(id);
        setJob(res.data);
      } catch (err) {
        console.error('Failed to load job details:', err);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading job details...</p>;
  }

  if (!job) {
    return <p className="text-center text-red-500">Job not found.</p>;
  }

  return (
    <div className="job-detail-container">
      <button
        onClick={() => navigate(-1)}
        className="back-button"
      >
        ← Back to Jobs
      </button>

      <h1 className="job-detail-title">{job.title}</h1>
      <p className="job-detail-location">{job.location}</p>

      <div className="job-detail-skills">
        {job.skills.split(',').map((skill) => (
          <span key={skill} className="skill-badge">
            {skill.trim()}
          </span>
        ))}
      </div>

      <p className="job-detail-description">{job.description}</p>
    </div>
  );
}
