import './RegisterPage.css';

export default function RegisterPage() {
  return (
    <div className="register-container">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <form className="space-y-4">
        <input type="text" placeholder="Name" className="form-input" />
        <input type="email" placeholder="Email" className="form-input" />
        <input type="password" placeholder="Password" className="form-input" />
        <input type="password" placeholder="Confirm Password" className="form-input" />
        <select className="form-input">
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        <button className="submit-btn">Create Account</button>
      </form>
    </div>
  );
}
