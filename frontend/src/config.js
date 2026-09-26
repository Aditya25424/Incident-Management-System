// Central place for environment-driven configuration.
// Vite exposes any variable prefixed with VITE_ via import.meta.env.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const TOKEN_STORAGE_KEY = 'ims_token';
export const USER_STORAGE_KEY = 'ims_user';
