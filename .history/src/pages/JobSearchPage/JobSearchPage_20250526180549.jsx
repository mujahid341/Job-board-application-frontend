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
      <div className="header-section">
        <h1 className="page-title">🔍 Find Your Next Job</h1>
        <p className="page-subtitle">Search by keyword/title, location, or skills.</p>
      </div>

      <div className="search-section">
        <input
          className="search-input"
          placeholder="Title or Keyword"
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
        />
        <input
          className="search-input"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <input
          className="search-input"
          placeholder="Skills"
          value={filters.skills}
          onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="results-section">
        {loading ? (
          <p className="loading-text">Loading results...</p>
        ) : jobs.length === 0 ? (
          <p className="no-results-text">No jobs found. Try adjusting your search!</p>
        ) : (
          <div className="job-grid">
            {jobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-info">
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-location">{job.location}</p>
                  <div className="job-skills">
                    {job.skills.split(',').map((skill) => (
                      <span key={skill} className="badge-skill">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                  <p className="job-preview">
                    {job.description.length > 100
                      ? `${job.description.slice(0, 100)}...`
                      : job.description}
                  </p>
                </div>
                <Link to={`/jobs/${job.id}`} className="view-link">
                  <span className="inline-flex items-center gap-1">
                    View Details
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
