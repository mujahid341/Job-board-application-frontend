// ✅ Updated App.jsx with Home Page, full routes, and auto-redirect on login
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';

// Home page
import HomePage from './pages/HomePage/HomePage';

// Auth pages
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';

// Employer pages
import EmployerDashboard from './pages/EmployerDashboard/EmployerDashboard';
import EmployerJobCreate from './pages/EmployerJobCreate/EmployerJobCreate';
import EmployerJobEdit from './pages/EmployerJobEdit/EmployerJobEdit';
import EmployerJobList from './pages/EmployerJobList/EmployerJobList';

// Job seeker pages
import JobSearchPage from './pages/JobSearchPage/JobSearchPage';
import JobDetailPage from './pages/JobDetailPage/JobDetailPage';

function App() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'employer') {
        navigate('/employer/dashboard');
      } else if (user.role === 'jobseeker') {
        navigate('/jobs');
      }
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<HomePage />} />

          {/* Auth Routes */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Employer Routes */}
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/employer/jobs/create" element={<EmployerJobCreate />} />
          <Route path="/employer/jobs/edit/:id" element={<EmployerJobEdit />} />
          <Route path="/employer/jobs" element={<EmployerJobList />} />

          {/* Job Seeker Routes */}
          <Route path="/jobs" element={<JobSearchPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
