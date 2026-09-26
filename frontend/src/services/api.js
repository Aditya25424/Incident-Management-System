import axios from 'axios';
import { API_BASE_URL, TOKEN_STORAGE_KEY } from '../config';

/**
 * Centralized Axios instance used by every service module.
 * A request interceptor reads the stored JWT and attaches it as a
 * Bearer token on every outgoing request. A response interceptor
 * clears stale credentials on 401s so the app falls back to the
 * login page instead of looping on invalid-token errors.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
    return Promise.reject(error);
  }
);

export default api;
