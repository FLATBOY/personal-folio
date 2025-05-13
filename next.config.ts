import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
  },
  allowedDevOrigins: ['http://192.168.128.38:3000'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://192.168.128.38:3000',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
