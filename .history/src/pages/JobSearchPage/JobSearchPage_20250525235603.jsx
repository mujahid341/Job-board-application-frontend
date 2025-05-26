import './JobSearchPage.css';
import { useEffect, useState } from 'react';
import { searchJobs } from '../../services/jobApi';

export default function JobSearchPage() {
  const [query, setQuery] = useState({ search: '', location: '', skills: '' });
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await searchJobs(query);
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, [query]);

  const handleInputChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  return (
    <div className="job-search-container">
      <h1 className="text-xl font-bold mb-4">Search Jobs</h1>
      <div className="filter-bar">
        <input className="filter-input" name="search" placeholder="Keyword" onChange={handleInputChange} />
        <input className="filter-input" name="location" placeholder="Location" onChange={handleInputChange} />
        <input className="filter-input" name="skills" placeholder="Skills" onChange={handleInputChange} />
      </div>
      <div className="job-list">
        {jobs.map(job => (
          <div key={job.id} className="job-card">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p>{job.location}</p>
            <p className="text-sm text-gray-600">{job.skills}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
