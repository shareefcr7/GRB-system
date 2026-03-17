/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/r/:path*',
        destination: 'https://grb-dashboard.vercel.app/r/:path*',
        permanent: false,
      },
      {
        source: '/api/:path*',
        destination: 'https://grb-backend-v8o2.onrender.com/api/:path*',
        permanent: false,
      }
    ]
  }
};

export default nextConfig;
