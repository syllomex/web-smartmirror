/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['openweathermap.org'],
  },
  env: {
    NEXT_PUBLIC_API_URL_PUBLIC: process.env.NEXT_PUBLIC_API_URL_PUBLIC,
  },
};
