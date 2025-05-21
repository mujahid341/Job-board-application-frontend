import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';

// Page-level components
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import EmployerJobCreate from './pages/EmployerJobCreate/EmployerJobCreate';
import EmployerJobEdit from './pages/EmployerJobEdit/EmployerJobEdit';
import EmployerJobList from './pages/EmployerJobList/EmployerJobList';
import JobSearchPage from './pages/JobSearchPage/JobSearchPage';
import JobDetailPage from './pages/JobDetailPage/JobDetailPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Auth */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Employer */}
        <Route path="/employer/jobs/create" element={<EmployerJobCreate />} />
        <Route path="/employer/jobs/edit" element={<EmployerJobEdit />} />
        <Route path="/employer/jobs" element={<EmployerJobList />} />

        {/* Job Seeker */}
        <Route path="/jobs" element={<JobSearchPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
