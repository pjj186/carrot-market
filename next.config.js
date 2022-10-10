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
};

module.exports = nextConfig;
