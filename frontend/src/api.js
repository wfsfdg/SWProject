import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // 백엔드 서버 주소
  withCredentials: true
});

export default api;
