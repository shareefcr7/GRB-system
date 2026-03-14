import React, { useState, useEffect } from 'react';
import { businessService } from '../../services/api';
import QRCodeGenerator from '../../components/QRCodeGenerator';

const QRManager = () => {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const qrUrl = business ? `${window.location.origin}/r/${business._id}` : '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">QR Code Designer</h1>
        <p className="mt-2 text-gray-600">
          Create a premium, branded QR code for your business. Customize colors, shapes, and add your logo.
        </p>
      </div>

      {business && (
        <QRCodeGenerator 
          defaultUrl={qrUrl} 
          businessName={business.name}
        />
      )}
      
      {!business && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
          Error: Could not load business data. Please try refreshing the page.
        </div>
      )}

      <div className="mt-12 p-6 bg-blue-50 border border-blue-100 rounded-2xl">
        <h3 className="text-lg font-bold text-blue-900 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">Why use a custom QR code?</h3>
        <p className="text-blue-800 opacity-80 leading-relaxed max-w-3xl">
          Branded QR codes with your colors and logo increase trust and scan rates by up to 30%. 
          Our Instagram-style generator ensures your QR code looks modern and professional in any restaurant or store environment.
        </p>
      </div>
    </div>
  );
};

export default QRManager;
