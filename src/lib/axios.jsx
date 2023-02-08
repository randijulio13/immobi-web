import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`,
});

instance.interceptors.request.use(config => {
  // Add custom header or modify config as needed
  return config;
});

export default instance;
