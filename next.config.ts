import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cihatsoft.com',
        pathname: '/islerimiz/**',
      },
    ],
  },
};

export default nextConfig;
