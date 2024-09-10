import axios, { AxiosInstance } from 'axios';
const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TAFALING_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
