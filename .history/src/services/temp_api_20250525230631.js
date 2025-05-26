import axios from 'axios';

const API = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'reqres-free-v1'  // ✅ Add this line!
  }
});

export const login = (payload) => API.post('/login', payload);
