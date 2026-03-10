import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor to add token to headers
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },
  registerBusiness: async (data) => {
    const response = await api.post('/auth/register-business', data);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('user');
  }
};

export const superAdminService = {
  addBusiness: async (data) => {
    const response = await api.post('/superadmin/businesses', data);
    return response.data;
  },
  getBusinesses: async () => {
    const response = await api.get('/superadmin/businesses');
    return response.data;
  },
  updateBusiness: async (id, data) => {
    const response = await api.put(`/superadmin/businesses/${id}`, data);
    return response.data;
  },
  deleteBusiness: async (id) => {
    const response = await api.delete(`/superadmin/businesses/${id}`);
    return response.data;
  },
  renewSubscription: async (id) => {
    const response = await api.post(`/superadmin/businesses/${id}/renew`);
    return response.data;
  },
  getAdmins: async () => {
    const response = await api.get('/superadmin/admins');
    return response.data;
  },
  addAdmin: async (data) => {
    const response = await api.post('/superadmin/admins', data);
    return response.data;
  },
  updateAdmin: async (id, data) => {
    const response = await api.put(`/superadmin/admins/${id}`, data);
    return response.data;
  },
  deleteAdmin: async (id) => {
    const response = await api.delete(`/superadmin/admins/${id}`);
    return response.data;
  },
  getDashboardStats: async () => {
    const response = await api.get('/superadmin/dashboard-stats');
    return response.data;
  }
};

export const businessService = {
  getBusinessDetails: async () => {
    const response = await api.get('/business');
    return response.data;
  },
  updateBusinessProfile: async (data) => {
    const response = await api.put('/business', data);
    return response.data;
  },
  generateQR: async () => {
    const response = await api.post('/business/generate-qr');
    return response.data;
  }
};

export const reviewService = {
  getReviews: async () => {
    const response = await api.get('/reviews');
    return response.data;
  }
};

export const billingService = {
  createOrder: async (data) => {
    const response = await api.post('/billing/create-order', data);
    return response.data;
  },
  verifyPayment: async (data) => {
    const response = await api.post('/billing/verify-payment', data);
    return response.data;
  }
};

export const publicService = {
  getBusiness: async (id) => {
    const response = await axios.get(`${API_URL}/business/public/${id}`);
    return response.data;
  },
  submitReview: async (id, data) => {
    const response = await axios.post(`${API_URL}/reviews/${id}`, data);
    return response.data;
  }
};

export default api;
