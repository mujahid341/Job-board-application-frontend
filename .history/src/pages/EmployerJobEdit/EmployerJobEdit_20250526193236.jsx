// ✅ EmployerJobEdit.jsx (corrected)
import './EmployerJobEdit.css';
import { useEffect, useState } from 'react';
import { getJobById, updateJob } from '../../services/jobApi';
import { useNavigate, useParams, Link } from 'react-router-dom';

export default function EmployerJobEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    location: '',
    skills: '',  // frontend uses plural
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadJob = async () => {
      try {
        const res = await getJobById(id);
        setForm({
          ...res.data,
          skills: res.data.skill || '',  // map backend 'skill' to frontend 'skills'
        });
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
    setSuccess('');
    setError('');
    try {
      await updateJob(id, {
        ...form,
        skill: form.skills,  // map frontend 'skills' back to backend 'skill'
      });
      setSuccess('Job updated successfully!');
      setTimeout(() => navigate('/employer/jobs'), 1500);
    } catch (err) {
      setError('Failed to update job.');
      console.error(err);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="job-form-container">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="form-input"
          placeholder="Title"
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
        ></textarea>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <div className="flex gap-4">
          <button className="submit-btn" type="submit">
            Update Job
          </button>
          <Link to="/employer/jobs" className="cancel-btn">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
