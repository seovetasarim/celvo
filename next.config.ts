import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cihatsoft.com",
        pathname: "/islerimiz/**",
      },
      {
        protocol: "https",
        hostname: "celvo.com.tr",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.celvo.com.tr",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
