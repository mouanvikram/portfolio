import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static HTML — deploy the `out/` folder to any CDN.
  output: "export",
  images: { unoptimized: true },
  experimental: {
    // Inline CSS into <head> so first paint needs no extra request.
    inlineCss: true,
  },
};

export default nextConfig;
