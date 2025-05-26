// JobSearchPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchJobs } from '../../services/jobApi';
import './JobSearchPage.css';

export default function JobSearchPage() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');
  const [jobs, setJobs] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await searchJobs({ title, location, skills });
      setJobs(res.data.content);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <div className="job-search-page bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="header-section">
        <h1 className="page-title flex items-center justify-center">
          🔍 Find Your Next Job
        </h1>
        <p className="page-subtitle">
          Search by keyword/title, location, or skills.
        </p>
      </div>

      <div className="search-section">
        <input
          className="search-input"
          placeholder="Title or Keyword"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="search-input"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          className="search-input"
          placeholder="Skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="job-grid">
        {jobs.length === 0 ? (
          <p className="no-results-text">No jobs found. Try adjusting your search!</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="job-card transform transition hover:scale-105 hover:shadow-lg"
            >
              <div className="job-info">
                <h3 className="job-title">{job.title}</h3>
                <p className="job-location">📍 {job.location}</p>
                <div className="mb-2">
                  {job.skills?.split(',').map((skill, idx) => (
                    <span key={idx} className="badge-skill">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
                <p className="job-preview">
                  {job.description ? `${job.description.slice(0, 100)}...` : ''}
                </p>
              </div>
              <div className="text-right mt-4">
                <Link to={`/jobs/${job.id}`} className="view-link">
                  View Details →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
