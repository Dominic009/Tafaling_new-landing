import axios, { AxiosInstance } from 'axios';
//[http://127.0.0.1:8000]
//[http://99.237.86.169:7070]
const axiosClient: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
