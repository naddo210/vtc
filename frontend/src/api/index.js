import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with auth header
const authAPI = axios.create({
  baseURL: API_URL
});

// Add auth token to requests
authAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

// Resources API
export const getResources = async () => {
  try {
    const response = await authAPI.get(`/resources`);
    return response.data;
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
};

export const createResource = async (resourceData) => {
  try {
    const response = await authAPI.post(`/resources`, resourceData);
    return response.data;
  } catch (error) {
    console.error('Error creating resource:', error);
    throw error;
  }
};

export const updateResource = async (id, resourceData) => {
  try {
    const response = await authAPI.put(`/resources/${id}`, resourceData);
    return response.data;
  } catch (error) {
    console.error('Error updating resource:', error);
    throw error;
  }
};

export const deleteResource = async (id) => {
  try {
    const response = await authAPI.delete(`/resources/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting resource:', error);
    throw error;
  }
};

// Offers API
export const getOffers = async () => {
  try {
    const response = await axios.get(`${API_URL}/offers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching offers:', error);
    throw error;
  }
};

export const createOffer = async (offerData) => {
  try {
    const response = await axios.post(`${API_URL}/offers`, offerData);
    return response.data;
  } catch (error) {
    console.error('Error creating offer:', error);
    throw error;
  }
};

export const updateOffer = async (id, offerData) => {
  try {
    const response = await axios.put(`${API_URL}/offers/${id}`, offerData);
    return response.data;
  } catch (error) {
    console.error('Error updating offer:', error);
    throw error;
  }
};

export const deleteOffer = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/offers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting offer:', error);
    throw error;
  }
};