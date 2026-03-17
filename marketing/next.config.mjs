/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/r/:path*',
        destination: 'https://grb-dashboard.vercel.app/r/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'https://grb-backend-v8o2.onrender.com/api/:path*',
      }
    ]
  }
};

export default nextConfig;
