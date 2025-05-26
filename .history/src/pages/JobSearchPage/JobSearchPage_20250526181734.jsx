import './JobSearchPage.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { searchJobs } from '../../services/jobApi';

export default function JobSearchPage() {
  const [filters, setFilters] = useState({ title: '', location: '', skills: '' });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await searchJobs(filters);
      setJobs(res.data.content);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-search-page">
      <div className="job-container">
        <div className="job-header">
          <h1 className="job-title">
            <span role="img" aria-label="search">
              🔍
            </span>{' '}
            Find Your Next Job
          </h1>
          <p className="job-subtitle">Search by keyword/title, location, or skills.</p>
        </div>

        <div className="search-grid">
          <input
            className="input-field"
            placeholder="Title or Keyword"
            value={filters.title}
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Location"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Skills"
            value={filters.skills}
            onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div>
          {loading ? (
            <p className="loading-text">Loading results...</p>
          ) : jobs.length === 0 ? (
            <p className="no-results-text">No jobs found. Try adjusting your search!</p>
          ) : (
            <div className="job-grid">
              {jobs.map((job) => (
                <div key={job.id} className="job-card">
                  <h3 className="job-card-title">{job.title}</h3>
                  <p className="job-card-location">{job.location}</p>
                  <div className="mb-2">
                    {job.skills.split(',').map((skill) => (
                      <span key={skill} className="skill-badge">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                  <p className="job-preview">
                    {job.description.length > 100
                      ? `${job.description.slice(0, 100)}...`
                      : job.description}
                  </p>
                  <Link to={`/jobs/${job.id}`} className="view-link">
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
