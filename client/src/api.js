// client/src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Server API URL
  withCredentials: true,
});

export default api;
