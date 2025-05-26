import './RegisterPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/temp_api'; // Ensure this is defined

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Job Seeker'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role.toLowerCase().replace(' ', '_') // e.g., "Job Seeker" -> "job_seeker"
      });
      console.log('Registered successfully:', res.data);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Registration failed. Try again.');
    }
  };

  return (
    <div className="register-container">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="form-input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="form-input"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="form-input"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="form-input"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          required
        />
        <select
          className="form-input"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option>Job Seeker</option>
          <option>Employer</option>
        </select>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="submit-btn">Create Account</button>
      </form>
    </div>
  );
}
