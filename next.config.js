const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    //add arweave
    domains: ['gateway.ipfs.io', 'arweave.net', 'cloudfront.net'],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.com',
      },
      {
        protocol: 'http',
        hostname: '**.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'ipfs**',
      },
      {
        protocol: 'https',
        hostname: '**.arweave.net',
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
        hostname: '**.pinata.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.io',
      },
    ],
  },
}

module.exports = nextConfig
