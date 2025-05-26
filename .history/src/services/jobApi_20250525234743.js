import axios from 'axios';

const jobAPI = axios.create({
  baseURL: 'http://localhost:8082/api/jobboard', // adjust if your backend address changes
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach token before each request if available
jobAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Get all jobs created by the logged-in employer
export const getMyJobs = () => jobAPI.get('/job/my');

// ✅ Create a new job
export const createJob = (data) => jobAPI.post('/job', data);

// ✅ Update an existing job by ID
export const updateJob = (id, data) => jobAPI.put(`/job/${id}`, data);

// ✅ Delete a job by ID
export const deleteJob = (id) => jobAPI.delete(`/job/${id}`);

// ✅ Get a single job by ID (for detail or edit pages)
export const getJobById = (id) => jobAPI.get(`/job/${id}`);

// ✅ Search jobs (for job seekers with filters)
export const searchJobs = (queryParams) => {
  const query = new URLSearchParams(queryParams).toString();
  return jobAPI.get(`/job/search?${query}`);
};

export default jobAPI;
