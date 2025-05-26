import './LoginPage.css';
import { useState } from 'react';
import { login } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login(form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'employer'); // or jobseeker
      navigate('/employer/dashboard'); // change route based on role
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="form-input"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="form-input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="submit-btn" type="submit">Login</button>
      </form>
    </div>
  );
}
