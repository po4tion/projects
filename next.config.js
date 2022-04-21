/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "secure.download.dm.origin.com",
      "api.mozambiquehe.re",
      "trackercdn.com",
    ],
  },
};

module.exports = nextConfig;
