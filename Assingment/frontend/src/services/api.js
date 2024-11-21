import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const login = (data) => api.post('/auth/login', data);
export const signup = (data) => api.post('/auth/signup', data);
export const fetchReviews = () => api.get('/reviews');
export const addReview = (data, token) => api.post('/reviews', data, { headers: { Authorization: `Bearer ${token}` } });
