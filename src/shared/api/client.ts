import axios from 'axios';
import { config } from '../config';

const $api = axios.create({
  baseURL: config.API_URL,
  withCredentials: true,
});


$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await $api.post('/auth/refresh'); // Запрос нового токена
      return $api(originalRequest);
    }
    return Promise.reject(error);
  }
);

$api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);



export default $api;