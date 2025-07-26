import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ["./src"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qr.sepay.vn",
        port: "",
        pathname: "/**",
      },
    ],
  },
  images: {
    domains: [
      'freakybucket1.s3.ap-southeast-1.amazonaws.com',
    ],
  },
};

export default nextConfig;
