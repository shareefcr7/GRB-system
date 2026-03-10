import React, { useState, useEffect } from 'react';
import { superAdminService } from '../../services/api';

const SubscriptionManagement = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscriptions = async () => {
    try {
      const data = await superAdminService.getBusinesses();
      setBusinesses(data);
    } catch (error) {
      console.error('Failed to fetch subscriptions', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleRenew = async (id, name) => {
    if (window.confirm(`Are you sure you want to renew the subscription for ${name} for another year?`)) {
      try {
        await superAdminService.renewSubscription(id);
        alert('Subscription renewed successfully!');
        fetchSubscriptions();
      } catch (error) {
        console.error('Failed to renew subscription', error);
        alert('Failed to renew subscription');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Subscription Management</h2>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center py-4 text-gray-500">Loading subscriptions...</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {businesses.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">No subscriptions found.</td>
                </tr>
              ) : (
                businesses.map((biz) => (
                  <tr key={biz._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{biz.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{biz.plan}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${biz.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {biz.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleRenew(biz._id, biz.name)}
                        className="text-indigo-600 hover:text-indigo-900 font-semibold"
                      >
                        Renew (+ 1 Year)
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SubscriptionManagement;
