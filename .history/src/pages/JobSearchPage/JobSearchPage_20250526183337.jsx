// JobSearchPage.jsx (updated font sizes)
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchJobs } from '../../services/jobApi';
import './JobSearchPage.css';

export default function JobSearchPage() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await searchJobs({ title, location, skills });
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
        <h1 className="page-title text-xl font-bold">🔍 Find Your Next Job</h1>
        <p className="page-subtitle text-sm text-gray-500">Search by keyword/title, location, or skills.</p>
      </div>
      <div className="search-section flex flex-col md:flex-row gap-2 mb-4">
        <input className="search-input" placeholder="Title or Keyword" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="search-input" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <input className="search-input" placeholder="Skills" value={skills} onChange={(e) => setSkills(e.target.value)} />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <p className="loading-text text-center text-sm text-gray-500">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="no-results-text text-center text-sm text-gray-500">No jobs found. Try adjusting your search!</p>
      ) : (
        <div className="job-grid grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="job-card p-4 rounded-lg shadow hover:shadow-md bg-white">
              <h2 className="job-title text-lg font-semibold mb-1">{job.title}</h2>
              <p className="job-location text-xs text-gray-500 mb-1">📍 {job.location}</p>
              <p className="job-skills text-xs text-gray-500 mb-2">{job.skills}</p>
              <p className="job-preview text-sm text-gray-600 mb-2 line-clamp-2">{job.description || 'No description provided.'}</p>
              <Link to={`/jobs/${job.id}`} className="view-link text-sm text-blue-600 hover:underline flex items-center gap-1">
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
