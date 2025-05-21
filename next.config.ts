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
        destination: "https://be-app-production-6ce5.up.railway.app/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [new URL("https://be-app-production-6ce5.up.railway.app/**")],
  },
};

export default nextConfig;
