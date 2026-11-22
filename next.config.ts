import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes a plain HTML/CSS/JS site to out/,
  // which Cloudflare Pages serves as files. No server needed.
  // Cache Components / Partial Prefetching are off: they need a Next server
  // (PPR can't run in export mode), and every page here is fully static.
  output: "export",
  // Emit work/the-eye/index.html (not the-eye.html beside a the-eye/ data
  // folder), so static hosts resolve every URL unambiguously.
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
