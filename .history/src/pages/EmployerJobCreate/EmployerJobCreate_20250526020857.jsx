import './EmployerJobCreate.css';
import { useState } from 'react';
import { createJob } from '../../services/jobApi';
import { useNavigate } from 'react-router-dom';

export default function EmployerJobCreate() {
  const [form, setForm] = useState({
    title: '',
    location: '',
    skills: '',
    description: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createJob(form);
      navigate('/employer/jobs');
    } catch (err) {
      setError('Failed to create job.');
      console.error(err);
    }
  };

  return (
    <div className="job-form-container">
      <h1 className="text-2xl font-bold mb-4">Create New Job</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input className="form-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className="form-input" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <input className="form-input" placeholder="Skills" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
        <textarea className="form-input h-24" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="submit-btn" type="submit">Save Job</button>
      </form>
    </div>
  );
}
