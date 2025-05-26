import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8082/api/jobboard'
});

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
export const searchJobs = ({ title, location, skills }) => {
  const params = new URLSearchParams();
  if (title) params.append('title', title);
  if (location) params.append('location', location);
  if (skills) params.append('skills', skills);

  return API.get(`/job/search?${params.toString()}`);
};


// ✅ NEW
export const getJobById = (id) => API.get(`/job/${id}`);
