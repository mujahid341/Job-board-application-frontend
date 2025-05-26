import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="home-container">
      <h1 className="text-4xl font-bold mb-4">Welcome to XcelerateIT Job Board</h1>
      <p className="text-gray-600 mb-6">
        Your gateway to find jobs, post opportunities, and build your career.
      </p>
      <div className="flex gap-4 justify-center">
        <Link to="/register" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
          Register
        </Link>
        <Link to="/login" className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700">
          Login
        </Link>
      </div>
    </div>
  );
}
