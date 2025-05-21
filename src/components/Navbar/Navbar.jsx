import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-lg">XcelerateIT</Link>
      <div className="flex gap-4">
        <Link to="/register" className="hover:underline">Register</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/jobs" className="hover:underline">Jobs</Link>
      </div>
    </nav>
  );
}
