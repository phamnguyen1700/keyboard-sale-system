import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./src'],
  },
  images: {
    domains: [
      'freakybucket1.s3.ap-southeast-1.amazonaws.com',
    ],
  },
};

export default nextConfig;
