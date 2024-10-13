/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: 'evenica.com',
        pathname: '/wp-content/uploads/**',
        protocol: 'https',
      },
    ],
  },
}

export default nextConfig
