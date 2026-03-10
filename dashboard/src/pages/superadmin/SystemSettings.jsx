import React from 'react';

const SystemSettings = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">System Settings</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Save Changes</button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium text-gray-700 border-b pb-2 mb-4">Platform Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Platform Name</label>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" defaultValue="GRB App" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Support Email</label>
              <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" defaultValue="support@grb.com" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-md font-medium text-gray-700 border-b pb-2 mb-4">Financial Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Gateway</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border">
                <option>Stripe</option>
                <option>Razorpay</option>
                <option>PayPal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tax Settings (%)</label>
              <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" defaultValue="18" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-md font-medium text-gray-700 border-b pb-2 mb-4">Notifications</h3>
          <div className="flex items-center mt-2">
            <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" defaultChecked />
            <label className="ml-2 block text-sm text-gray-900">Email notifications on new business registration</label>
          </div>
          <div className="flex items-center mt-2">
            <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" defaultChecked />
            <label className="ml-2 block text-sm text-gray-900">Alert on failed subscription payments</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
