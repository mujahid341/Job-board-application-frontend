import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import EmployerJobCreate from './pages/EmployerJobCreate/EmployerJobCreate';
import EmployerJobEdit from './pages/EmployerJobEdit/EmployerJobEdit';
import EmployerJobList from './pages/EmployerJobList/EmployerJobList';

function App() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Phase 2: Employer job management */}
      <Route path="/employer/jobs/create" element={<EmployerJobCreate />} />
      <Route path="/employer/jobs/edit" element={<EmployerJobEdit />} />
      <Route path="/employer/jobs" element={<EmployerJobList />} />
    </Routes>
  );
}

export default App;
