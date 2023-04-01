/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    PGHOST: 'ep-little-3191.us-east-2.aws.neon.tech',
    PGDATABASE: 'neondb',
    PGUSER:'ziaukhan',
    PGPASSWORD:'oCRid75Qvn'
  }
}

module.exports = nextConfig
