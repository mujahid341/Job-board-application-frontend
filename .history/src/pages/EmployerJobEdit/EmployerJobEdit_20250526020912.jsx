import './EmployerJobEdit.css';
import { useEffect, useState } from 'react';
import { getMyJobs, updateJob } from '../../services/jobApi';
import { useNavigate, useParams } from 'react-router-dom';

export default function EmployerJobEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    location: '',
    skills: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadJob = async () => {
      try {
        const res = await getMyJobs();
        const job = res.data.find((j) => j.id === id);
        if (job) setForm(job);
      } catch (err) {
        setError('Failed to load job.');
        console.error(err);
      } finally {
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
      setError('Failed to update job.');
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="job-form-container">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input className="form-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className="form-input" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <input className="form-input" placeholder="Skills" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
        <textarea className="form-input h-24" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="submit-btn" type="submit">Update Job</button>
      </form>
    </div>
  );
}
