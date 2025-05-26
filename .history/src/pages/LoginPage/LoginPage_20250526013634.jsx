import './LoginPage.css';
import { useState } from 'react';
import { login } from '../../services/temp_api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login(form);
      
      // Assume backend returns role in response, fallback to 'employer' if missing
      const role = res.data.role || 'employer';

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', role);
      setUser({ token: res.data.token, role });

      // ✅ Redirect immediately after successful login
      if (role === 'employer') {
        navigate('/employer/dashboard');
      } else if (role === 'jobseeker') {
        navigate('/jobs');
      } else {
        navigate('/'); // fallback if unknown role
      }
    } catch (err) {
      console.error('Login failed:', err);
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
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="submit-btn" type="submit">Login</button>
      </form>
    </div>
  );
}
