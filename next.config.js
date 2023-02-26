const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['gateway.ipfs.io'],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.com',
      },
      {
        protocol: 'https',
        hostname: '**.xyz',
      },
      {
        protocol: 'https',
        hostname: '**.mypinata.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.io',
      },
    ],
  },
}

module.exports = nextConfig
