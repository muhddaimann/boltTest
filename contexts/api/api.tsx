import axios from 'axios';
import { getToken } from '@/contexts/tokenContext';

const api = axios.create({
  baseURL: 'https://endpoint.daythree.ai/faithMobile/routes',
  timeout: 5000,
});

api.interceptors.request.use(
  async (config) => {``
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        `Response Error [${error.config.method?.toUpperCase()} ${error.config.url}]:`,
        error.response.data
      );
    } else if (error.request) {
      console.error('Request Error (no response):', error.request);
    } else {
      console.error('Axios Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
