import axios from 'axios';

const token = localStorage.getItem('token') || '';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const apiWithToken = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: { Authorization: `Bearer ${token}` },
});

export { api, apiWithToken };
