import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8082/api/jobboard'
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
