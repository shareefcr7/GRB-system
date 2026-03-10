import React, { useState, useEffect } from 'react';
import { superAdminService } from '../../services/api';

const Overview = () => {
  const [stats, setStats] = useState({
    totalBusinesses: 0,
    totalRevenue: 0,
    activeSubs: 0,
    activeUsers: 0,
    recentBusinesses: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await superAdminService.getDashboardStats();
        setStats({
          totalBusinesses: data.totalBusinesses,
          totalRevenue: data.totalRevenue,
          activeSubs: data.activeSubs,
          activeUsers: data.activeUsers,
          recentBusinesses: data.recentBusinesses
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500 font-medium tracking-wide">Gathering System Statistics...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Businesses</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalBusinesses}</p>
          <span className="text-green-500 text-sm font-medium">+12% this month</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">₹{stats.totalRevenue.toLocaleString()}</p>
          <span className="text-green-500 text-sm font-medium">+8% this month</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Active Subs</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{stats.activeSubs}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Active Users</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{stats.activeUsers}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Businesses Registered</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recentBusinesses.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">No recent businesses found.</td>
                </tr>
              ) : (
                stats.recentBusinesses.map((biz) => (
                  <tr key={biz._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{biz.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{biz.plan || 'Trial'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${biz.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {biz.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
