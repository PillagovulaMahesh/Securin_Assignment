/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", "www.allrecipes.com"], // allow recipe images if needed
  },
};

module.exports = nextConfig;
