import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8082/api/jobboard',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export const getMyJobs = () => API.get('/jobs/my');
export const createJob = (data) => API.post('/jobs', data);
export const updateJob = (id, data) => API.put(`/jobs/${id}`, data);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);
export const getJobById = (id) => API.get(`/jobs/${id}`);
