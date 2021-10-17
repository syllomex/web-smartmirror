import axios, { AxiosRequestConfig } from 'axios';

const env = process.env.NODE_ENV;

const baseURL =
  env === 'development'
    ? process.env.NEXT_PUBLIC_API_URL_LOCAL
    : process.env.NEXT_PUBLIC_API_URL_PUBLIC;

const api = axios.create({
  baseURL,
});

export default api;

export const fetcher = async (url: string, configs?: AxiosRequestConfig) => {
  const res = await api.request({ url, ...configs });
  return res.data;
};
