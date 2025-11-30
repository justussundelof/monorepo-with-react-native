import { Platform } from 'react-native';

// API Configuration
// For local development:
// - iOS Simulator: localhost works
// - Android Emulator: use 10.0.2.2 (points to host machine)
// - Physical Device: use your computer's local IP (e.g., 192.168.1.x)
//
// To find your local IP:
// - macOS/Linux: run `ipconfig getifaddr en0` or `ifconfig | grep inet`
// - Windows: run `ipconfig` and look for IPv4 Address

const getLocalApiUrl = () => {
  if (!__DEV__) {
    return 'https://your-production-strapi-url.com';
  }

  // For Android emulator, localhost doesn't work - use 10.0.2.2
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:1337';
  }

  // For iOS simulator and web, localhost works fine
  return 'http://localhost:1337';
};

export const API_URL = getLocalApiUrl();

export const API_ENDPOINTS = {
  articles: '/api/articles',
  categories: '/api/categories',
} as const;
