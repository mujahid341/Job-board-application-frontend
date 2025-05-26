import { useEffect, useState } from 'react';
import { searchJobs } from '../../services/jobApi';
import { Link } from 'react-router-dom';

export default function JobSearchPage() {
  const [query, setQuery] = useState({ search: '', location: '', skills: '' });
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await searchJobs(query);
      setJobs(res.data.content || []);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [query]);

  const handleInputChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Search Jobs</h1>
      <input name="search" placeholder="Keyword" onChange={handleInputChange} />
      <input name="location" placeholder="Location" onChange={handleInputChange} />
      <input name="skills" placeholder="Skills" onChange={handleInputChange} />
      {jobs.map((job) => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <p>{job.location}</p>
          <p>{job.skills}</p>
          <Link to={`/jobs/${job.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}
