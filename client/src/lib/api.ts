// API Configuration
export const API_BASE_URL = (() => {
  if (typeof window === 'undefined') {
    return 'http://localhost:5000';
  }

  // In development
  if (import.meta.env.DEV) {
    return 'http://localhost:5000';
  }

  // In production on GitHub Pages, you'll need a separate backend URL
  // For now, you can configure this as an environment variable
  return import.meta.env.VITE_API_URL || 'http://localhost:5000';
})();
