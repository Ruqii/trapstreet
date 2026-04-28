import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // GitHub Pages: emit a fully static site to ./out
  output: "export",
  // GitHub Pages serves files via paths with trailing slashes — this avoids
  // /how-it-works → /how-it-works/index.html redirect issues.
  trailingSlash: true,
  // next/image's optimizer needs a Node runtime — disable it for static export.
  images: { unoptimized: true },
};

export default nextConfig;
