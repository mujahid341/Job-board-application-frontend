import './EmployerJobEdit.css';

export default function EmployerJobEdit() {
  return (
    <div className="job-form-container">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
      <form className="space-y-4">
        <input className="form-input" defaultValue="Senior DevOps Engineer" />
        <input className="form-input" defaultValue="Bangalore" />
        <input className="form-input" defaultValue="AWS, Docker, Terraform" />
        <textarea className="form-input h-24">
Experienced DevOps engineer with knowledge of cloud infrastructure...
        </textarea>
        <button className="submit-btn">Update Job</button>
      </form>
    </div>
  );
}
