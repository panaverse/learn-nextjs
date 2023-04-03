/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    NEON_DATABASE_URL: 'Paste_Neon_Connection_String_Here',
  }
  
}

module.exports = nextConfig
