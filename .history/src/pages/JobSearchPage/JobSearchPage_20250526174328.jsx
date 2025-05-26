import { Link } from 'react-router-dom';
import { useState } from 'react';
import { searchJobs } from '../../services/jobApi';

export default function JobSearchPage() {
  const [query, setQuery] = useState('');
  const [jobs, setJobs] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await searchJobs(query);
      setJobs(res.data.content); // assuming backend returns Page<JobResponse>
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <div className="job-search-container">
      <h1>Search Jobs</h1>

      <div className="search-bar-container">
        <input
          className="search-bar"
          placeholder="Search by skill, title, location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="job-list">
        {jobs.length === 0 ? (
          <p>No jobs found. Try a search!</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-info">
                <h3>{job.title}</h3>
                <p>{job.location}</p>
                <p>{job.skills}</p>
              </div>
              <Link to={`/jobs/${job.id}`} className="view-btn">
                View
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
