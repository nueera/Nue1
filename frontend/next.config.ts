import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,

  // ── Image Optimization ──────────────────────────────────────────────────
  // Allow images from any remote source (avatars, OG images, social media).
  // For production, narrow this to known domains for better security.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },

  // ── Bundle Optimization ─────────────────────────────────────────────────
  // Tree-shake large libraries that re-export everything from a barrel file.
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
