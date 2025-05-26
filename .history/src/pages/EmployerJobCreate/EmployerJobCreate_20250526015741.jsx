import './EmployerJobCreate.css';

export default function EmployerJobCreate() {
  return (
    <div className="job-form-container">
      <h1 className="text-2xl font-bold mb-4">Create New Job</h1>
      <form className="space-y-4">
        <input className="form-input" placeholder="Job Title" />
        <input className="form-input" placeholder="Location" />
        <input className="form-input" placeholder="Skills (comma separated)" />
        <textarea className="form-input h-24" placeholder="Job Description"></textarea>
        <button className="submit-btn">Save Job</button>
      </form>
    </div>
  );}
