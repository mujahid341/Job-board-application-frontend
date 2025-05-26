import './EmployerJobEdit.css';
import { useEffect, useState } from 'react';
import { getJobById, updateJob } from '../../services/jobApi';
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
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJob = async () => {
      try {
        const res = await getJobById(id);
        setForm({
          title: res.data.title,
          location: res.data.location,
          skills: res.data.skills || res.data.skill, // handle both keys
          description: res.data.description
        });
      } catch (err) {
        console.error('Failed to load job:', err);
        setError('Failed to load job details.');
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
      console.error('Update failed:', err);
      setError('Failed to update job.');
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="job-form-container">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="form-input"
          placeholder="Job Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="form-input"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          className="form-input"
          placeholder="Skills"
          value={form.skills}
          onChange={(e) => setForm({ ...form, skills: e.target.value })}
        />
        <textarea
          className="form-input h-24"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button className="submit-btn" type="submit">Update Job</button>
      </form>
    </div>
  );
}
