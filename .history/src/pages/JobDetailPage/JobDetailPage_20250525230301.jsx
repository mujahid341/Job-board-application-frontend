import './JobDetailPage.css';

export default function JobDetailPage() {
  const job = {
    title: "React Developer",
    location: "Remote",
    skills: "React, Tailwind CSS",
    description: "We are looking for a passionate frontend developer..."
  };

  return (
    <div className="job-detail-container">
      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-2">{job.location}</p>
      <p className="text-sm mb-4">{job.skills}</p>
      <p>{job.description}</p>
    </div>
  );
}
