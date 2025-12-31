import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // output: "export",
  typescript: {
    ignoreBuildErrors: false,
  },
  turbopack: {
    rules: {
      // Make *.svg importable as React components
      "*.svg": {
        loaders: [{ loader: "@svgr/webpack", options: { svgo: true } }],
        as: "*.js",
      },
    },
  },
};

export default withNextIntl(nextConfig);
