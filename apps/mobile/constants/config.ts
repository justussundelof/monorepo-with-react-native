// API Configuration
// Update this URL based on your environment
// For local development: http://localhost:1337
// For production: your deployed Strapi URL
export const API_URL = __DEV__
  ? 'http://localhost:1337'
  : 'https://your-production-strapi-url.com';

export const API_ENDPOINTS = {
  articles: '/api/articles',
  categories: '/api/categories',
} as const;
