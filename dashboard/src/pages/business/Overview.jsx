import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { reviewService, businessService } from '../../services/api';

const Overview = () => {
  const [reviews, setReviews] = useState([]);
  const [business, setBusiness] = useState(null);
  const [stats, setStats] = useState({
    totalScans: 0,
    avgRating: 0,
    internalFeedbackCount: 0,
    unresolvedIssues: 0,
    scansGrowth: '+0%',
    ratingGrowth: '+0'
  });
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsData, businessData, statsData] = await Promise.all([
          reviewService.getReviews(),
          businessService.getBusinessDetails(),
          businessService.getBusinessStats()
        ]);
        setReviews(reviewsData || []);
        setBusiness(businessData);
        setStats(statsData);
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCopyLink = () => {
    if (business && business.googleReviewLink) {
      navigator.clipboard.writeText(business.googleReviewLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <div>
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Real-Time Insights for Smarter Business Decisions</h1>
        <p className="text-gray-500 text-base max-w-3xl">
          This dashboard provides a complete overview of your business performance with real-time data.
          Easily track total scans, monitor customer ratings, and manage internal feedback in one place.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 transform transition duration-300 hover:scale-105 hover:shadow-md cursor-default text-center sm:text-left">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Scans</h3>
            <span className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            </span>
          </div>
          <p className="text-4xl font-extrabold text-gray-900 mt-4 tracking-tight">{stats.totalScans.toLocaleString()}</p>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              {stats.scansGrowth}
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
          <p className="text-4xl font-extrabold text-gray-900 mt-4 tracking-tight">{stats.avgRating}</p>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              {stats.ratingGrowth}
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
          <p className="text-4xl font-extrabold text-gray-900 mt-4 tracking-tight">{stats.internalFeedbackCount}</p>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">Unresolved issues: {stats.unresolvedIssues}</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 sm:p-6 rounded-xl shadow-md border-transparent text-white transform transition duration-300 hover:scale-105 hover:shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-white/80 text-sm font-medium uppercase tracking-wider mb-2">QR Code Status</h3>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
              <span className="w-2 h-2 mr-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Active
            </div>
          </div>
          <Link to="/admin/qr" className="mt-6 w-full py-2 px-4 border border-white/30 rounded-lg shadow-sm text-sm font-medium hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 text-center">
            Design & Download QR
          </Link>
        </div>
      </div>

      {/* Quick Actions & Recent Activity Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Internal Feedback */}
        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">Recent Internal Feedback (1-3★)</h2>
            <Link to="/admin/reviews" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">View All &rarr;</Link>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-4 text-gray-500">Loading feedback...</div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8 text-gray-500 border border-dashed border-gray-200 rounded-lg">
                No recent internal feedback.
              </div>
            ) : (
              reviews.slice(0, 5).map((review) => (
              <div key={review._id} className="flex p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow bg-gray-50/30">
                <div className="mr-4 mt-1">
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating || 5)].map((_, j) => (
                      <svg key={j} className="h-5 w-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 mt-1 block">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                       <span className="font-semibold text-gray-800">{review.customerName || 'Anonymous'}</span>
                      {review.sentiment && (
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded ${review.sentiment === 'Angry' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                          {review.sentiment}
                        </span>
                      )}
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${review.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {review.status || 'Pending'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{review.feedback}</p>

                  {review.aiReplySuggestion && (
                    <div className="mt-3 p-3 bg-indigo-50/50 rounded-lg border border-indigo-100 relative">
                      <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-indigo-500 uppercase flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        AI Suggested Reply
                      </div>
                      <p className="text-sm text-indigo-900 mt-1 italic">"{review.aiReplySuggestion}"</p>
                    </div>
                  )}
                </div>
              </div>
            )))}
          </div>
        </div>
        {/* Google Direct Review Info */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full mt-6 lg:mt-0">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Google Direct Review</h2>
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            <h3 className="text-md font-semibold text-gray-800 mb-2">Share your original review link</h3>
            <p className="text-sm text-gray-500 mb-6">Redirect satisfied customers directly to your Google Business Profile to leave a 5-star review.</p>
            
            <div className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4 truncate text-sm text-gray-600 font-mono">
              {loading ? 'Loading...' : (business?.googleReviewLink || 'No link configured yet')}
            </div>
          </div>
          <button
            onClick={handleCopyLink}
            disabled={!business?.googleReviewLink}
            className={`w-full mt-auto py-2.5 border-2 rounded-lg font-semibold transition-colors focus:ring-4 text-center block ${
              copied 
                ? 'bg-green-50 border-green-500 text-green-600 focus:ring-green-100' 
                : 'bg-white border-blue-600 text-blue-700 hover:bg-blue-50 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}>
            {copied ? 'Link Copied!' : 'Copy & Share Link'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
