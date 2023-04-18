/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    CONNECTION_STRING: 'postgres://uzairbangee:cr5kPWqG0oEy@ep-rapid-mountain-148403.us-east-2.aws.neon.tech/neondb',
  }
}

module.exports = nextConfig
