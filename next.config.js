/** @type {import('next').NextConfig} */

const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  transpilePackages: ["three"],
  images: {
    domains: ["storage.ko-fi.com", "storage.googleapis.com"],
  },
  output: "standalone",
  reactStrictMode: true,
};

module.exports = withNextIntl(nextConfig);
