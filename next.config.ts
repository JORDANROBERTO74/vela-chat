import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  agentRules: false,
  outputFileTracingIncludes: {
    "/[locale]/opengraph-image": ["./src/assets/**/*"],
  },
};

export default nextConfig;
