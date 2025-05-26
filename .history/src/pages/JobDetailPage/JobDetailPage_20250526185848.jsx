import './JobDetailPage.css';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getJobById } from '../../services/jobApi';

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const loadJob = async () => {
      try {
        const res = await getJobById(id);
        setJob(res.data);
      } catch (err) {
        console.error('Failed to load job:', err);
      }
    };
    loadJob();
  }, [id]);

  if (!job) {
    return <p>Loading...</p>;
  }

  return (
    <div className="job-detail-container">
      <Link to="/jobs" className="back-button">
        ← Back to Jobs
      </Link>
      <h1 className="job-detail-title">{job.title}</h1>
      <p className="job-detail-location">📍 {job.location}</p>

      {/* ✅ RENDER SKILLS HERE */}
      <div className="job-detail-skills mb-4">
        {job.skill &&
          job.skill.split(',').map((skill, index) => (
            <span key={index} className="skill-badge">
              {skill.trim()}
            </span>
          ))}
      </div>

      <p className="job-detail-description">{job.description}</p>
    </div>
  );
}
