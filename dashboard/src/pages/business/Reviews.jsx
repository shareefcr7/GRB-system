import React, { useState, useEffect } from 'react';
import { reviewService } from '../../services/api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await reviewService.getReviews();
        setReviews(data);
      } catch (error) {
        console.error('Failed to load reviews', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading feedback data...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Internal Feedback (1-3★)</h2>
          <p className="text-gray-500 mt-1">Manage private customer feedback before it reaches Google.</p>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
            <p className="text-gray-500 font-medium text-lg">You have no low rating feedback!</p>
            <p className="text-gray-400 text-sm mt-1">Excellent job keeping your customers happy.</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="flex flex-col sm:flex-row p-4 sm:p-5 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-gray-50/30">
              <div className="mb-4 sm:mb-0 sm:mr-6 mt-1 flex-shrink-0 flex sm:block justify-between items-center sm:items-start">
                <div className="flex text-yellow-500">
                  {[...Array(review.rating)].map((_, j) => (
                    <svg key={j} className="h-6 w-6 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500 mt-0 sm:mt-2 block font-medium">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-2 sm:space-x-3">
                    <span className="font-bold text-gray-800 text-lg truncate">{review.customerName}</span>
                    <span className="text-gray-500 text-sm truncate">{review.customerPhone}</span>
                    {review.sentiment && (
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${review.sentiment.includes('Angry') ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                        {review.sentiment}
                      </span>
                    )}
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${review.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {review.status}
                  </span>
                </div>
                <p className="text-gray-700 mt-2 text-base leading-relaxed bg-white p-3 border border-gray-100 rounded-lg shadow-sm">
                  "{review.feedback}"
                </p>

                {review.aiReplySuggestion && review.status !== 'Resolved' && (
                  <div className="mt-4 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 relative shadow-sm">
                    <div className="absolute -top-3 left-4 bg-white px-2 py-0.5 border border-indigo-100 rounded-md text-[10px] font-bold text-indigo-600 uppercase flex items-center shadow-sm">
                      <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      AI Assistant Suggestion
                    </div>
                    <p className="text-sm text-indigo-900 mt-1 font-medium italic">"{review.aiReplySuggestion}"</p>
                  </div>
                )}

                {review.status !== 'Resolved' && (
                  <div className="mt-4 flex flex-col sm:flex-row sm:space-x-3 gap-3 sm:gap-0 sm:justify-end border-t border-gray-100 pt-4">
                    <button className="w-full sm:w-auto text-sm bg-indigo-600 text-white px-4 py-2.5 sm:py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500">
                      Copy AI Reply to WhatsApp
                    </button>
                    <button className="w-full sm:w-auto text-sm bg-white border border-gray-300 text-gray-700 px-4 py-2.5 sm:py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-offset-1 focus:ring-gray-200">
                      Mark as Resolved
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;
