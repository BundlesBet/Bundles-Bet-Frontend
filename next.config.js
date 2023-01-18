/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ['a.espncdn.com'],
  },
}

module.exports = nextConfig
