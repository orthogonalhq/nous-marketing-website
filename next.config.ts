import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "192.168.1.69"],
  reactStrictMode: true,
  typedRoutes: true
};

export default nextConfig;
