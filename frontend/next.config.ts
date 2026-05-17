import type { NextConfig } from "next";

// ── Bundle Analyzer (optional) ────────────────────────────────────────────
let withBundleAnalyzer = (config: NextConfig) => config;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const analyzer = require("@next/bundle-analyzer");
  withBundleAnalyzer = analyzer({ enabled: process.env.ANALYZE === "true" });
} catch {
  // @next/bundle-analyzer not installed — skip wrapping
}

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,

  // ── Image Optimization ──────────────────────────────────────────────────
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },

  // ── API Proxy Rewrites (Development) ────────────────────────────────────
  // In production, nginx handles the proxy. These rewrites are for
  // local development when running Next.js directly (without Docker/nginx).
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
    return [
      {
        source: "/api/v1/:path*",
        destination: `${backendUrl}/:path*`,
      },
      {
        source: "/api/docs",
        destination: `${backendUrl.replace('/api/v1', '')}/api/docs`,
      },
      {
        source: "/api/redoc",
        destination: `${backendUrl.replace('/api/v1', '')}/api/redoc`,
      },
      {
        source: "/api/openapi.json",
        destination: `${backendUrl.replace('/api/v1', '')}/api/openapi.json`,
      },
    ];
  },

  // ── Bundle Optimization ─────────────────────────────────────────────────
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "recharts",
      "framer-motion",
      "date-fns",
      "@radix-ui/react-accordion",
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-avatar",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
