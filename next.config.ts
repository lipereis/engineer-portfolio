import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/engineer-portfolio",
  assetPrefix: "/engineer-portfolio",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
