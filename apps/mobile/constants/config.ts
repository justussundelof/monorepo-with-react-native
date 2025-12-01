// API Configuration
export const API_URL = __DEV__
  ? 'http://192.168.1.141:1337'
  : 'https://your-production-strapi-url.com';

export const API_ENDPOINTS = {
  articles: '/api/articles',
  categories: '/api/categories',
} as const;
