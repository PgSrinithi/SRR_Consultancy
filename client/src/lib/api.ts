// API Configuration
export const API_BASE_URL = (() => {
  if (typeof window === 'undefined') {
    return 'http://localhost:5000';
  }

  // In development
  if (import.meta.env.DEV) {
    return 'http://localhost:5000';
  }

  // In production, use relative paths for API calls
  // This works with Vercel serverless functions
  return '';
})();
