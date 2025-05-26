import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8082/api/jobboard'
});

// Automatically attach token from localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getMyJobs = () => API.get('/job/my');
export const createJob = (data) => API.post('/job', data);
export const updateJob = (id, data) => API.put(`/job/${id}`, data);
export const deleteJob = (id) => API.delete(`/job/${id}`);

// ✅ NEW: Search jobs by keyword
export const searchJobs = (query) => {
  const params = new URLSearchParams();
  params.append('title', query);
  params.append('location', query);
  params.append('skills', query);

  return API.get(`/job/search?${params.toString()}`);
};
