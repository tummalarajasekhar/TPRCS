import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // This tells Next.js to ignore ESLint errors during the build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This tells Next.js to ignore TypeScript errors during the build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;