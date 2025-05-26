import { Link } from 'react-router-dom';
import { useState } from 'react';
import { searchJobs } from '../../services/jobApi';

export default function JobSearchPage() {
  const [query, setQuery] = useState('');
  const [jobs, setJobs] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await searchJobs(query);
      setJobs(res.data.content);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <div className="job-search-page">
      <div className="header-section">
        <h1 className="page-title">🔍 Find Your Next Job</h1>
        <p className="page-subtitle">Search by skill, title, or location — explore your future.</p>
      </div>

      <div className="search-section">
        <input
          className="search-input"
          placeholder="e.g., React, Pune, Backend"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="results-section">
        {jobs.length === 0 ? (
          <p className="no-results-text">No jobs found. Try a search!</p>
        ) : (
          <div className="job-grid">
            {jobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-info">
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-location">{job.location}</p>
                  <p className="job-skills">{job.skills}</p>
                </div>
                <Link to={`/jobs/${job.id}`} className="view-link">
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
