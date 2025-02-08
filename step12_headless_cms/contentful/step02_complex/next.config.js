/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    CONTENTFUL_SPACE_ID: "507pec980n",
    CONTENTFUL_ACCESS_KEY: "uvhKkHLM8N2jzZ8NVCwnpL-YcAcLIDF4mLe0J7fmm"
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
