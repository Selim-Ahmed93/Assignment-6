import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // All remote image hostnames allow korar jonno
      },
    ],
  },
};

export default nextConfig;
