// API Configuration
export const API_BASE_URL = (() => {
  if (typeof window === 'undefined') {
    return 'http://localhost:3000';
  }

  // In development
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }

  // In production, use relative paths for API calls
  // This works with Next.js API routes
  return '';
})();
