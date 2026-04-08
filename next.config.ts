import type { NextConfig } from "next";

const apiBackend = process.env.BACKEND_URL ?? "http://localhost:8080";

const nextConfig: NextConfig = {
  // Enables a minimal self-contained server build (server.js + node_modules subset)
  // for the production Docker image.
  output: "standalone",

  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "khansoft.az" },
      { protocol: "https", hostname: "www.khansoft.az" },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiBackend}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
