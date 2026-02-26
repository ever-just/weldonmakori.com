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
      {
        protocol: "https",
        hostname: "weldonmakori.com",
      },
    ],
  },
};

export default nextConfig;
