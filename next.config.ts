import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['planpro-dev.up.railway.app', 'planpro.up.railway.app', 'localhost'],
  },
  // Enable standalone output for Docker deployment
  output: 'standalone',
  // External packages for server components
  serverExternalPackages: [],
};

export default nextConfig;
