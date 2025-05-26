import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../../services/jobApi';

export default function EmployerJobCreate() {
  const [form, setForm] = useState({ title: '', location: '', skills: '', description: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createJob(form);
      navigate('/employer/jobs');
    } catch (err) {
      console.error('Failed to create job:', err);
    }
  };

  return (
    <div>
      <h1>Create New Job</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Job Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <input placeholder="Skills" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button type="submit">Save Job</button>
      </form>
    </div>
  );
}
