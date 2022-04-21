/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["secure.download.dm.origin.com", "api.mozambiquehe.re"],
  },
};

module.exports = nextConfig;
