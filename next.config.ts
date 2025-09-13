import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  // Enable standalone output for Docker deployment
  output: 'standalone',
  // Optimize for production
  swcMinify: true,
  // Enable experimental features for better performance
  experimental: {
    // Enable server components
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;
