import './EmployerJobList.css';

export default function EmployerJobList() {
  const jobs = [
    { id: 1, title: "React Developer", location: "Remote", skills: "React, Tailwind" },
    { id: 2, title: "Backend Engineer", location: "Pune", skills: "Java, Spring Boot" }
  ];

  return (
    <div className="job-list-container">
      <h2 className="text-xl font-semibold mb-4">My Jobs</h2>
      <div className="space-y-4">
        {jobs.map(job => (
          <div key={job.id} className="job-card">
            <div>
              <h3 className="text-lg font-bold">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.location}</p>
              <p className="text-sm">{job.skills}</p>
            </div>
            <div className="button-group">
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
