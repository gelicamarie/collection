const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ['gateway.ipfs.io', 'arweave.net', 'cloudfront.net'],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.com',
      },
      {
        protocol: 'https',
        hostname: '**.ens.domains',
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
