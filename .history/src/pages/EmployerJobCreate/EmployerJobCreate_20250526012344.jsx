import './CreateJobForm.css';
import { useState } from 'react';
import { createJob } from '../../services/jobApi';
import { useNavigate } from 'react-router-dom';

export default function CreateJobForm() {
  const [form, setForm] = useState({ title: '', location: '', skills: '', description: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createJob(form);
      navigate('/employer/jobs');
    } catch (err) {
      console.error('Create failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <input className="form-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input className="form-input" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <input className="form-input" placeholder="Skills" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
      <textarea className="form-input" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
      <button className="submit-btn" type="submit">Create Job</button>
    </form>
  );
}
