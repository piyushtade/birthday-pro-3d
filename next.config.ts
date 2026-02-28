import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/birthday-pro-3d' : '',
};

export default nextConfig;
