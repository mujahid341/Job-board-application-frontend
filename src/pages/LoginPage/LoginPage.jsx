import './LoginPage.css';

export default function LoginPage() {
  return (
    <div className="login-container">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form className="space-y-4">
        <input type="email" placeholder="Email" className="form-input" />
        <input type="password" placeholder="Password" className="form-input" />
        <button className="submit-btn">Login</button>
      </form>
    </div>
  );
}
