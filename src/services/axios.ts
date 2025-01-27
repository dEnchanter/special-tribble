import axios from 'axios';
import { apiVersionPath, baseUrl } from './api';
import { getAccessToken } from '@/utils/storage';

const axiosInstance = axios.create({
  baseURL: `${baseUrl}/${apiVersionPath}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;
