import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
      {
        protocol: "http",
        hostname: "142.93.78.220",
      },
      {
        protocol: "https",
        hostname: "pb.weldonmakori.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/pb/:path*",
        destination: "http://142.93.78.220/:path*",
      },
    ];
  },
};

export default nextConfig;
