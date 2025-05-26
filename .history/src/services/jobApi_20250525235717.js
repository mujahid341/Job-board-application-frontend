import axios from 'axios';

const jobAPI = axios.create({
  baseURL: 'http://localhost:8082/api/jobboard',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach token before each request
jobAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getMyJobs = () => jobAPI.get('/job/my');
export const createJob = (data) => jobAPI.post('/job', data);
export const updateJob = (id, data) => jobAPI.put(`/job/${id}`, data);
export const deleteJob = (id) => jobAPI.delete(`/job/${id}`);
export const getJobById = (id) => jobAPI.get(`/job/${id}`);

// ✅ FIXED: use the correct base + endpoint
export const searchJobs = (queryParams) => {
  const query = new URLSearchParams(queryParams).toString();
  return jobAPI.get(`/job/search?${query}`);
};

export default jobAPI;
