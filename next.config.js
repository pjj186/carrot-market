/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "imagedelivery.net",
      "videodelivery.net",
      "cloudflarestream.com",
      "customer-m033z5x00ks6nunl.cloudflarestream.com",
    ],
  },
  experimental: {
    reactRoot: true,
  },
};

module.exports = nextConfig;
