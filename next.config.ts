import type { NextConfig } from "next";

const nextConfig: NextConfig = { output: "standalone",
  allowedDevOrigins: ["192.168.124.41", "192.168.124.41:3004"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
