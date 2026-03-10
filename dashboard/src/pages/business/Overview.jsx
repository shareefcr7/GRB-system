import React from 'react';
import { Link } from 'react-router-dom';

const Overview = () => {
  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transform transition duration-300 hover:scale-105 hover:shadow-md cursor-default text-center sm:text-left">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Scans</h3>
            <span className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            </span>
          </div>
          <p className="text-4xl font-extrabold text-gray-900 mt-4 tracking-tight">1,245</p>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              12.5%
            </span>
            <span className="text-gray-400 ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transform transition duration-300 hover:scale-105 hover:shadow-md cursor-default text-center sm:text-left">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Avg Rating</h3>
            <span className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            </span>
          </div>
          <p className="text-4xl font-extrabold text-gray-900 mt-4 tracking-tight">4.8</p>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              0.2
            </span>
            <span className="text-gray-400 ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transform transition duration-300 hover:scale-105 hover:shadow-md cursor-default text-center sm:text-left">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Internal Feedback</h3>
            <span className="p-2 bg-red-50 rounded-lg text-red-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </span>
          </div>
          <p className="text-4xl font-extrabold text-gray-900 mt-4 tracking-tight">12</p>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">Unresolved issues: 3</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-xl shadow-md border-transparent text-white transform transition duration-300 hover:scale-105 hover:shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-white/80 text-sm font-medium uppercase tracking-wider mb-2">QR Code Status</h3>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
              <span className="w-2 h-2 mr-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Active
            </div>
          </div>
          <button className="mt-6 w-full py-2 px-4 border border-white/30 rounded-lg shadow-sm text-sm font-medium hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50">
            Download QR Code
          </button>
        </div>
      </div>

      {/* Quick Actions & Recent Activity Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Internal Feedback */}
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">Recent Internal Feedback (1-3★)</h2>
            <Link to="/admin/reviews" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">View All &rarr;</Link>
          </div>
          <div className="space-y-4">
            {[
              { name: "Rahul S.", rating: 2, date: "Today, 10:45 AM", status: "Pending", text: "Service was very slow today. Food was cold.", sentiment: "Angry", aiReply: "We apologize for the delayed service and cold food. Please reach out so we can make this right." },
              { name: "Anonymous", rating: 3, date: "Yesterday", status: "Resolved", text: "Table wasn't clean when we sat down.", sentiment: "Disappointed", aiReply: "We're sorry your table wasn't clean. We've addressed this with our staff." }
            ].map((review, i) => (
              <div key={i} className="flex p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow bg-gray-50/30">
                <div className="mr-4 mt-1">
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, j) => (
                      <svg key={j} className="h-5 w-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 mt-1 block">{review.date}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-800">{review.name}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded ${review.sentiment === 'Angry' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                        {review.sentiment}
                      </span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${review.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {review.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{review.text}</p>

                  <div className="mt-3 p-3 bg-indigo-50/50 rounded-lg border border-indigo-100 relative">
                    <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-indigo-500 uppercase flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      AI Suggested Reply
                    </div>
                    <p className="text-sm text-indigo-900 mt-1 italic">"{review.aiReply}"</p>
                  </div>

                  {review.status === 'Pending' && (
                    <div className="mt-3 flex space-x-3">
                      <button className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-md font-medium hover:bg-indigo-700 transition-colors shadow-sm">Use AI Reply</button>
                      <button className="text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md font-medium hover:bg-gray-50 transition-colors">Mark Resolved</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Subscription Plan</h2>
          <div className="flex-1">
            <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 font-medium">Current Plan</span>
                <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wider">Pro Tier</span>
              </div>
              <div className="text-3xl font-extrabold text-gray-900 mb-1">₹1999<span className="text-sm text-gray-500 font-normal">/mo</span></div>
              <p className="text-sm text-gray-600 mt-3 border-t border-gray-200 pt-3">
                Renews on <span className="font-semibold text-gray-800">April 3, 2026</span>
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-700">
                <svg className="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Advanced Analytics
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <svg className="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Staff Management
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <svg className="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Low Rating Alerts
              </div>
            </div>
          </div>
          <Link
            to="/admin/billing"
            className="w-full mt-6 py-2.5 bg-white border-2 border-indigo-600 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-50 transition-colors focus:ring-4 focus:ring-indigo-100 text-center block">
            Upgrade to Premium
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Overview;
