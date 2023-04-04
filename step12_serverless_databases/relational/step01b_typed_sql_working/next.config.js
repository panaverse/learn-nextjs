/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    NEON_DATABASE_URL: 'paste_neon_connection_string',
  }
  
}

module.exports = nextConfig
