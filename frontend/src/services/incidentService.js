import api from './api';

/**
 * All incident-related backend calls, mirroring the REST contract
 * documented in the project report (APPENDIX B).
 */
const incidentService = {
  async getAll() {
    const response = await api.get('/incidents');
    return response.data;
  },

  async getMyReported() {
    const response = await api.get('/incidents/my-reported');
    return response.data;
  },

  async getMyAssigned() {
    const response = await api.get('/incidents/my-assigned');
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/incidents/${id}`);
    return response.data;
  },

  async create({ title, description, severity }) {
    const response = await api.post('/incidents', { title, description, severity });
    return response.data;
  },

  async assignResolver(incidentId, resolverUserId) {
    const response = await api.put(`/incidents/${incidentId}/assign/${resolverUserId}`);
    return response.data;
  },

  async updateStatus(incidentId, status) {
    const response = await api.put(`/incidents/${incidentId}/status`, { status });
    return response.data;
  },

  async remove(incidentId) {
    await api.delete(`/incidents/${incidentId}`);
  },

  async listResolvers() {
    const response = await api.get('/users/resolvers');
    return response.data;
  },
};

export default incidentService;
