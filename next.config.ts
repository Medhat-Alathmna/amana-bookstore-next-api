import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/api/books',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;