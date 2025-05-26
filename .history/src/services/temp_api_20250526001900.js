// src/services/temp_api.js

import axios from 'axios';

const tempAPI = axios.create({
  baseURL: 'http://localhost:8082/api/jobboard',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const login = (data) => tempAPI.post('/auth/login', data);
export const register = (data) => tempAPI.post('/auth/register', data);

export default tempAPI;
