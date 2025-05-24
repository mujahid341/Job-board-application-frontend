import './LoginPage.css';
import { useState } from 'react';
import { login } from '../../services/temp_api'; // make sure this sends only email + password
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Log the payload (debug only)
      console.log('Sending payload:', {
        email: form.email,
        password: form.password
      });

      // Send only email and password
      const res = await login({
        email: form.email,
        password: form.password
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'employer'); // simulate login role
      navigate('/employer/dashboard'); // redirect
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
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="form-input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="submit-btn" type="submit">Login</button>
      </form>
    </div>
  );
}
