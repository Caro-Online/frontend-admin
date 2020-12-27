import axios from 'axios';
import { BaseUrl } from '../configs/api';

const AUTH_TOKEN = localStorage.getItem('token');
const configs = {
  baseURL: BaseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
};

const axiosInstance = axios.create(configs);

axiosInstance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axiosInstance.interceptors.request.use(
  function (config) {
    config.headers = { ...config.headers };
    // you can also do other modification in config
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    if (response.status === 401) {
      // your failure logic
      console.error('ERROR-401', response);
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);
export default axiosInstance;
