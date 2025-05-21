import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import EmployerJobCreate from './pages/EmployerJobCreate/EmployerJobCreate';
import EmployerJobEdit from './pages/EmployerJobEdit/EmployerJobEdit';
import EmployerJobList from './pages/EmployerJobList/EmployerJobList';
import JobSearchPage from './pages/JobSearchPage/JobSearchPage';
import JobDetailPage from './pages/JobDetailPage/JobDetailPage';

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Employer Job Management */}
      <Route path="/employer/jobs/create" element={<EmployerJobCreate />} />
      <Route path="/employer/jobs/edit" element={<EmployerJobEdit />} />
      <Route path="/employer/jobs" element={<EmployerJobList />} />

      {/* Job Seeker Pages */}
      <Route path="/jobs" element={<JobSearchPage />} />
      <Route path="/jobs/:id" element={<JobDetailPage />} />
    </Routes>
  );
}

export default App;
