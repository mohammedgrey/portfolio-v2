import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  typescript: {
    // Enable type checking during development and build
    ignoreBuildErrors: false,
  },
};

export default withNextIntl(nextConfig);
