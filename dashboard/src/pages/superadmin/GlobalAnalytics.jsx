import React from 'react';

const GlobalAnalytics = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Global Analytics</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="border border-gray-200 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Revenue Growth</h3>
          <div className="h-64 bg-gray-50 flex items-center justify-center rounded border border-dashed border-gray-300">
            <span className="text-gray-400">Revenue Chart Placeholder</span>
          </div>
        </div>

        <div className="border border-gray-200 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Business Growth</h3>
          <div className="h-64 bg-gray-50 flex items-center justify-center rounded border border-dashed border-gray-300">
            <span className="text-gray-400">Business Growth Chart Placeholder</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
          <h4 className="text-indigo-800 font-medium mb-2">Orders per day</h4>
          <p className="text-2xl font-bold text-indigo-900">1,432</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h4 className="text-blue-800 font-medium mb-2">Top Businesses</h4>
          <ul className="text-sm text-blue-900 list-disc pl-4 mt-2">
            <li>Cafe Mocha</li>
            <li>Tech Solutions</li>
            <li>Bella Spa</li>
          </ul>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <h4 className="text-green-800 font-medium mb-2">Top Cities</h4>
          <ul className="text-sm text-green-900 list-disc pl-4 mt-2">
            <li>Bangalore</li>
            <li>Mumbai</li>
            <li>Delhi</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GlobalAnalytics;
