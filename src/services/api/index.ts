import axios, { AxiosRequestConfig } from 'axios';

const env = process.env.NODE_ENV;

const baseURL =
  env === 'development'
    ? 'http://192.168.0.104:8000'
    : 'https://smart-mirror-one.vercel.app/api';

const api = axios.create({ baseURL });

export default api;

export const fetcher = async (url: string, configs?: AxiosRequestConfig) => {
  const res = await api.request({ url, ...configs });
  return res.data;
};
