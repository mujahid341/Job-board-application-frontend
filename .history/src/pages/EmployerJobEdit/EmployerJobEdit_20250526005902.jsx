import { useEffect, useState } from 'react';
import { getJobById, updateJob } from '../../services/jobApi';
import { useNavigate, useParams } from 'react-router-dom';

export default function EmployerJobEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', location: '', skills: '', description: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJob = async () => {
      try {
        const res = await getJobById(id);
        setForm(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load job:', err);
        setLoading(false);
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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Job</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Job Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <input placeholder="Skills" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button type="submit">Update Job</button>
      </form>
    </div>
  );
}
