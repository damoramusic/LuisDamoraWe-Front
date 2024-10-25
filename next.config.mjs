// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
// next.config.mjs
import 'dotenv/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
  },
  images: {
    domains: ['127.0.0.1', 'localhost', 'localhost:4000'], // Añade aquí los dominios permitidos
  },
};

export default nextConfig;