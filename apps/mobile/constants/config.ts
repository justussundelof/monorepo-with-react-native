import { Platform } from 'react-native';

// ⚠️ IMPORTANT: If using Expo Go on a physical device, set your computer's local IP here
// To find your local IP:
// - macOS: Open System Settings → Network → Your active connection → Details → TCP/IP
// - macOS (terminal): run `ipconfig getifaddr en0`
// - Windows: run `ipconfig` and look for IPv4 Address
// - Linux: run `hostname -I | awk '{print $1}'`
//
// Example: '192.168.1.100' or '192.168.0.50'
const LOCAL_IP = 'YOUR_LOCAL_IP_HERE'; // 👈 Replace this with your actual IP

const getLocalApiUrl = () => {
  if (!__DEV__) {
    return 'https://your-production-strapi-url.com';
  }

  // If using Expo Go or physical device, use your computer's local IP
  if (LOCAL_IP !== 'YOUR_LOCAL_IP_HERE') {
    return `http://${LOCAL_IP}:1337`;
  }

  // For Android emulator (not Expo Go), use 10.0.2.2
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:1337';
  }

  // For iOS simulator and web, localhost works
  return 'http://localhost:1337';
};

export const API_URL = getLocalApiUrl();

export const API_ENDPOINTS = {
  articles: '/api/articles',
  categories: '/api/categories',
} as const;
