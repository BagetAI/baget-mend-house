/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app.baget.ai',
      },
    ],
  },
};

module.exports = nextConfig;
