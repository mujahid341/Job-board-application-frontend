import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobById } from '../../services/jobApi';

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await getJobById(id);
        setJob(res.data);
      } catch (err) {
        console.error('Failed to fetch job:', err);
      }
    }
    fetchJob();
  }, [id]);

  if (!job) return <div>Loading...</div>;

  return (
    <div className="job-detail-container">
      <Link to="/jobs" className="back-button">
        ← Back to Jobs
      </Link>
      <h1 className="job-detail-title">{job.title}</h1>
      <p className="job-detail-location">📍 {job.location}</p>
      <div className="job-detail-skills">
        {job.skills &&
          job.skills.split(',').map((skill, index) => (
            <span key={index} className="skill-badge">
              {skill.trim()}
            </span>
          ))}
      </div>
      <p className="job-detail-description">{job.description}</p>
    </div>
  );
}
