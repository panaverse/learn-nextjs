/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    NEON_DATABASE_URL: 'postgres://ziaukhan:oCRMIid75Qvn@ep-little-frog-313391.us-east-2.aws.neon.tech/neondb',
  }
  
}

module.exports = nextConfig
