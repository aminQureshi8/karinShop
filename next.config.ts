import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "185.204.197.79",
        pathname: "/Brand/**",
      },
    ],
  },
};

export default nextConfig;
