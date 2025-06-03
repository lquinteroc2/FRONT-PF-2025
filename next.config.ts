import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/terminos',
        destination: '/terms-of-service',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
