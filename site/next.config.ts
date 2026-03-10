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
        hostname: "167.71.243.183",
      },
      {
        protocol: "https",
        hostname: "pb.weldonmakori.com",
      },
      {
        protocol: "https",
        hostname: "weldonmakori.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;
