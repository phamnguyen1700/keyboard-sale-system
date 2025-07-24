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
};

export default nextConfig;
