import axios, { AxiosRequestConfig } from 'axios';

const env = process.env.NODE_ENV;

const baseURL =
  env === 'development'
    ? 'http://192.168.0.104:8000'
    : 'https://api-smartmirror.herokuapp.com';

const api = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export default api;

export const fetcher = async (url: string, configs?: AxiosRequestConfig) => {
  const res = await api.request({ url, ...configs });
  return res.data;
};
