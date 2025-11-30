import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Automatically detect the correct API URL for your environment
const getApiUrl = () => {
  if (!__DEV__) {
    return 'https://your-production-strapi-url.com';
  }

  // For Expo Go: automatically use the same IP as the dev server
  const debuggerHost = Constants.expoConfig?.hostUri;
  if (debuggerHost) {
    // Extract the IP from the debuggerHost (removes the port)
    const host = debuggerHost.split(':')[0];
    return `http://${host}:1337`;
  }

  // Fallback for other environments
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:1337'; // Android emulator
  }

  return 'http://localhost:1337'; // iOS simulator / web
};

export const API_URL = getApiUrl();

export const API_ENDPOINTS = {
  articles: '/api/articles',
  categories: '/api/categories',
} as const;
