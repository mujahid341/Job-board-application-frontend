import './RegisterPage.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Job Seeker',
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
      await axios.post('http://localhost:8082/api/jobboard/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role === 'Employer' ? 'EMPLOYER' : 'JOB_SEEKER'  // ✅ Enum-safe
      });
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
        <input type="text" placeholder="Name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="form-input" required />
        <input type="email" placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="form-input" required />
        <input type="password" placeholder="Password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="form-input" required />
        <input type="password" placeholder="Confirm Password" value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          className="form-input" required />
        <select className="form-input" value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option>Job Seeker</option>
          <option>Employer</option>
        </select>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="submit-btn" type="submit">Create Account</button>
      </form>
    </div>
  );
}
