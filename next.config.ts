import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/", // URL you want to redirect from
        destination: "/uffici", // URL you want to redirect to
        permanent: true, // Use true for 308 (permanent) or false for 307 (temporary)
      },
    ];
  },
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
