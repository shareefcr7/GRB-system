/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/r/:path*',
        destination: 'https://grb-dashboard.vercel.app/r/:path*',
      },
      {
        source: '/feedback/:path*',
        destination: 'https://grb-dashboard.vercel.app/feedback/:path*',
      },
      {
        source: '/thank-you',
        destination: 'https://grb-dashboard.vercel.app/thank-you',
      },
      {
        source: '/assets/:path*',
        destination: 'https://grb-dashboard.vercel.app/assets/:path*',
      },
      {
        source: '/login',
        destination: 'https://grb-dashboard.vercel.app/login',
      },
      {
        source: '/register',
        destination: 'https://grb-dashboard.vercel.app/register',
      },
      {
        source: '/admin/:path*',
        destination: 'https://grb-dashboard.vercel.app/admin/:path*',
      },
      {
        source: '/superadmin/:path*',
        destination: 'https://grb-dashboard.vercel.app/superadmin/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'https://grb-backend-v8o2.onrender.com/api/:path*',
      }
    ]
  }
};

export default nextConfig;
