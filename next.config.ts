import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "http://192.168.1.102:3000/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [new URL("http://192.168.1.102:3000/**")],
  },
};

export default nextConfig;
