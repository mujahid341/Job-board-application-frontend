import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { searchJobs } from '../../services/jobApi';
import './JobSearchPage.css';

export default function JobSearchPage() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await searchJobs({
        keyword: title || null,
        location: location || null,
        skills: skills || null
      });
      setJobs(res.data.content);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      setJobs([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs(); // load all jobs initially
  }, []);

  return (
    <div className="job-search-container">
      <h1 className="job-search-title">Search Jobs</h1>

      <form onSubmit={handleSearch} className="job-search-form">
        <input
          className="job-search-input"
          placeholder="Job title or keyword"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="job-search-input"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          className="job-search-input"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <button type="submit" className="job-search-button">
          Search
        </button>
      </form>

      <div className="job-list">
        {jobs.length === 0 ? (
          <p className="no-jobs-message">No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-card-content">
                <h3 className="job-card-title">{job.title}</h3>
                <p className="job-card-info">Location: {job.location}</p>
                <p className="job-card-info">Skills: {job.skill || job.skills}</p>
                <p className="job-card-description">
                  {job.description ? job.description.slice(0, 120) + '...' : ''}
                </p>
              </div>
              <Link to={`/jobs/${job.id}`} className="view-button">
                View
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
