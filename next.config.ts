import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['https://planpro-dev.up.railway.app', 'https://planpro.up.railway.app', 'localhost'],
  },
  // Enable standalone output for Docker deployment
  output: 'standalone',
  // External packages for server components
  serverExternalPackages: [],
};

export default nextConfig;
