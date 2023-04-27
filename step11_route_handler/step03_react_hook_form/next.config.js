/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    PGHOST: 'ep-solitary-queen-763729.us-east-2.aws.neon.tech',
    PGDATABASE: 'neondb',
    PGUSER:'hamzah.syed17',
    PGPASSWORD:'8ljNqiH1sCoF'
  }
}

module.exports = nextConfig
