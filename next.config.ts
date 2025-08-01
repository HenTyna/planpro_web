/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9090/api',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },

  // API rewrites for development - only if API URL is properly configured
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    // Only add rewrites if we have a valid API URL that's not undefined
    if (apiUrl && apiUrl !== 'undefined' && apiUrl.startsWith('http')) {
      return [
        {
          source: '/api/:path*',
          destination: `${apiUrl}/:path*`,
        },
      ];
    }
    
    // Return empty array if no valid API URL
    return [];
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Image optimization - disable for deployment to avoid sharp module issues
  images: {
    domains: ['localhost'],
    unoptimized: true, // Disable image optimization to avoid sharp module issues
  },

  // Server external packages
  serverExternalPackages: [],
};

module.exports = nextConfig;
