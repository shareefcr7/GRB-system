import React, { useState, useEffect } from 'react';
import { businessService } from '../../services/api';

const QRManager = () => {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const data = await businessService.getBusinessDetails();
        setBusiness(data);
      } catch (error) {
        console.error('Failed to load business details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBusiness();
  }, []);

  const handleGenerateQR = async () => {
    try {
      setGenerating(true);
      const data = await businessService.generateQR();
      setBusiness((prev) => ({ ...prev, qrCodeUrl: data.qrCodeUrl }));
      alert('QR Code generated successfully!');
    } catch (error) {
      console.error('Failed to generate QR code', error);
      alert('Error generating QR code. Make sure backend is running properly.');
    } finally {
      setGenerating(false);
    }
  };

  const downloadQR = () => {
    if (!business?.qrCodeUrl) return;
    const a = document.createElement('a');
    a.href = business.qrCodeUrl;
    a.download = `${business.name.replace(/\s+/g, '_')}_QRCode.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading QR settings...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">QR Code Manager</h2>
          <p className="text-gray-500 mt-1">Download your unique QR code to place on tables and counters.</p>
        </div>
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
          <span className="w-2 h-2 mr-2 bg-green-500 rounded-full animate-pulse"></span>
          System Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
          {business?.qrCodeUrl ? (
            <div className="flex flex-col items-center text-center">
              <img src={business.qrCodeUrl} alt="Store QR Code" className="w-64 h-64 object-contain shadow-md rounded-lg p-2 bg-white" />
              <p className="text-sm font-semibold text-indigo-600 mt-6 tracking-wide uppercase">Your Active QR Code</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              </div>
              <p className="text-gray-500 font-medium">No QR Code Generated</p>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-lg">
            <h3 className="font-semibold text-indigo-800 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              How it works
            </h3>
            <p className="text-sm text-indigo-900/80 leading-relaxed">
              When customers scan this code, they will be taken to your fast-loading feedback page. 4 and 5 star reviews are sent directly to Google. Low ratings are sent to this dashboard so you can fix issues privately.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            {!business?.qrCodeUrl ? (
              <button
                onClick={handleGenerateQR}
                disabled={generating}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition-colors disabled:bg-indigo-400"
              >
                {generating ? 'Generating...' : 'Generate New QR Code'}
              </button>
            ) : (
              <>
                <button
                  onClick={downloadQR}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  Download HQ Image
                </button>
                <button
                  onClick={handleGenerateQR}
                  disabled={generating}
                  className="w-full py-2.5 px-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {generating ? 'Regenerating...' : 'Regenerate QR Code'}
                </button>
              </  >
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRManager;
