// src/utils/request.js
import axios from 'axios';
import { message } from 'antd';

const service = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器（处理认证）
service.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器（处理错误）
service.interceptors.response.use(
  response => {
    console.log(response)
    if (response.status !== 200) {
      console.log(response.data)
      // message.error(response.data.msg || '请求错误');
      return Promise.reject(response.data);
    }
    console.log(response.data)
    return response.data;
  },
  error => {
    const response = error.response;
    if (response) {
      switch (response.status) {
        case 401:
          message.error('登录已过期');
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          message.error('没有操作权限');
          break;
        default:
          message.error(response.data?.message || '服务异常');
      }
    }
    return Promise.reject(error);
  }
);

export default service;