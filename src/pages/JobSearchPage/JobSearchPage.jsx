import './JobSearchPage.css';
import { Link } from 'react-router-dom';

export default function JobSearchPage() {
  const jobs = [
    { id: 1, title: "React Developer", location: "Remote", skills: "React, CSS" },
    { id: 2, title: "Backend Engineer", location: "Mumbai", skills: "Java, Spring Boot" }
  ];

  return (
    <div className="job-search-container">
      <h1 className="text-xl font-bold mb-4">Search Jobs</h1>
      <input className="search-bar" placeholder="Search by skill, title, location..." />

      <div className="job-list">
        {jobs.map(job => (
          <div key={job.id} className="job-card">
            <div>
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p>{job.location}</p>
              <p className="text-sm text-gray-600">{job.skills}</p>
            </div>
            <Link to={`/jobs/${job.id}`} className="view-btn">View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
