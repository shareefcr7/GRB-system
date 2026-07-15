import React, { useState, useEffect } from 'react';
import { superAdminService } from '../../services/api';

const SystemSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [platformName, setPlatformName] = useState('GRB App');
  const [supportEmail, setSupportEmail] = useState('support@grb.com');
  const [paymentGateway, setPaymentGateway] = useState('Razorpay');
  const [taxPercentage, setTaxPercentage] = useState(18);
  const [emailNotificationOnRegistration, setEmailNotificationOnRegistration] = useState(true);
  const [alertOnFailedPayment, setAlertOnFailedPayment] = useState(true);
  const [watchDemoVideoUrl, setWatchDemoVideoUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await superAdminService.getSettings();
        if (data) {
          setPlatformName(data.platformName || 'GRB App');
          setSupportEmail(data.supportEmail || 'support@grb.com');
          setPaymentGateway(data.paymentGateway || 'Razorpay');
          setTaxPercentage(data.taxPercentage ?? 18);
          setEmailNotificationOnRegistration(data.emailNotificationOnRegistration ?? true);
          setAlertOnFailedPayment(data.alertOnFailedPayment ?? true);
          setWatchDemoVideoUrl(data.watchDemoVideoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ');
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        setMessage({ type: 'error', text: 'Failed to load settings.' });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      await superAdminService.updateSettings({
        platformName,
        supportEmail,
        paymentGateway,
        taxPercentage: Number(taxPercentage),
        emailNotificationOnRegistration,
        alertOnFailedPayment,
        watchDemoVideoUrl
      });
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    } catch (error) {
      console.error('Error saving settings:', error);
      const errMsg = error.response?.data?.message || error.message || 'Failed to save settings.';
      setMessage({ type: 'error', text: errMsg });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-3xl">
        <p className="text-gray-500">Loading system settings...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-3xl text-left">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">System Settings</h2>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message.text && (
        <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-55 text-red-800 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium text-gray-700 border-b pb-2 mb-4">Platform Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Platform Name</label>
              <input 
                type="text" 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" 
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Support Email</label>
              <input 
                type="email" 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" 
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-md font-medium text-gray-700 border-b pb-2 mb-4">Marketing Website Settings</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Watch Demo Video Embed URL (YouTube/Vimeo)</label>
              <input 
                type="text" 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" 
                placeholder="e.g. https://www.youtube.com/embed/5F2j2XUoAIE"
                value={watchDemoVideoUrl}
                onChange={(e) => setWatchDemoVideoUrl(e.target.value)}
              />
              <span className="text-xs text-gray-400 mt-1 block">Specify the embed URL of the explanation video (e.g. <code>https://www.youtube.com/embed/...</code>)</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-md font-medium text-gray-700 border-b pb-2 mb-4">Financial Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Gateway</label>
              <select 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                value={paymentGateway}
                onChange={(e) => setPaymentGateway(e.target.value)}
              >
                <option>Stripe</option>
                <option>Razorpay</option>
                <option>PayPal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tax Settings (%)</label>
              <input 
                type="number" 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" 
                value={taxPercentage}
                onChange={(e) => setTaxPercentage(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-md font-medium text-gray-700 border-b pb-2 mb-4">Notifications</h3>
          <div className="flex items-center mt-2">
            <input 
              type="checkbox" 
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
              checked={emailNotificationOnRegistration}
              onChange={(e) => setEmailNotificationOnRegistration(e.target.checked)}
            />
            <label className="ml-2 block text-sm text-gray-900">Email notifications on new business registration</label>
          </div>
          <div className="flex items-center mt-2">
            <input 
              type="checkbox" 
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
              checked={alertOnFailedPayment}
              onChange={(e) => setAlertOnFailedPayment(e.target.checked)}
            />
            <label className="ml-2 block text-sm text-gray-900">Alert on failed subscription payments</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
