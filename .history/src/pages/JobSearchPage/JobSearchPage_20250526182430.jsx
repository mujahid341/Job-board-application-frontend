import React, { useState } from 'react';
import { searchJobs } from '../../services/jobApi';
import { Link } from 'react-router-dom';
import './JobSearchPage.css';

export default function JobSearchPage() {
  const [filters, setFilters] = useState({ title: '', location: '', skills: '' });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.title) params.title = filters.title;
      if (filters.location) params.location = filters.location;
      if (filters.skills) params.skills = filters.skills;

      const res = await searchJobs(params);
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
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : jobs.length === 0 ? (
        <p className="no-results-text">No jobs found. Try adjusting your search!</p>
      ) : (
        <div className="job-grid">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-info">
                <h3 className="job-title">{job.title}</h3>
                <p className="job-location">{job.location}</p>
                <div>
                  {(job.skills || '').split(',').map((skill) => (
                    <span key={skill} className="badge-skill">{skill.trim()}</span>
                  ))}
                </div>
                <p className="job-preview">
                  {job.description
                    ? job.description.length > 100
                      ? `${job.description.slice(0, 100)}...`
                      : job.description
                    : 'No description provided.'}
                </p>
              </div>
              <Link to={`/jobs/${job.id}`} className="view-link">View Details →</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}