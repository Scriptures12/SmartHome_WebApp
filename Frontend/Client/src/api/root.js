// Backend API
export const BASE_URL = "http://localhost:5000/";


// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  timeout: 10000, // 10 seconds timeout
});

export default axiosInstance;
