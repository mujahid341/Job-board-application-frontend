// src/services/temp_api.js

import axios from 'axios';

const API = axios.create({
  baseURL: 'https://reqres.in/api'
});

export const login = (payload) => API.post('/login', payload);
export const register = (payload) => API.post('/register', payload);

export default tempAPI;
