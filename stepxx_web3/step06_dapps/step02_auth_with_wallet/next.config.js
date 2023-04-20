/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    CONNECTION_STRING: 'Enter your connection string',

  }
}

module.exports = nextConfig
