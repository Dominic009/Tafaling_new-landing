import axios, { AxiosInstance } from 'axios';
import toast from 'react-hot-toast';
const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://99.237.86.169:7070/api",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ERR_NETWORK' && error.message.includes('Network Error')) {
      console.log('Request timed out');
      toast.error(error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
