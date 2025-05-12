import axios from 'axios';
import { config } from '../config';

const $api = axios.create({
  baseURL: config.API_URL, 
  withCredentials: true,
});

$api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem(config.AUTH_TOKEN_KEY);
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default $api;