import api from './api';

/**
 * All authentication-related backend calls live here so components
 * never construct auth URLs or payloads themselves.
 */
const authService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register({ name, email, password, role }) {
    const response = await api.post('/auth/register', { name, email, password, role });
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/users/me');
    return response.data;
  },
};

export default authService;
