import './EditJobForm.css';
import { useState, useEffect } from 'react';
import { getJobById, updateJob } from '../../services/jobApi';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditJobForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', location: '', skills: '', description: '' });

  useEffect(() => {
    const loadJob = async () => {
      try {
        const res = await getJobById(id);
        setForm(res.data);
      } catch (err) {
        console.error('Failed to load job:', err);
      }
    };
    loadJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateJob(id, form);
      navigate('/employer/jobs');
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <input className="form-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input className="form-input" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <input className="form-input" placeholder="Skills" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
      <textarea className="form-input" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
      <button className="submit-btn" type="submit">Update Job</button>
    </form>
  );
}