import React, { useState, useEffect } from 'react';
import { businessService } from '../../services/api';

const Settings = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    googleReviewLink: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        const data = await businessService.getBusinessDetails();
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          address: data.address || '',
          googleReviewLink: data.googleReviewLink || '',
        });
      } catch (error) {
        console.error('Failed to load business details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinessInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await businessService.updateBusinessProfile(formData);
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Error updating settings', error);
      alert(error.response?.data?.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-10 text-gray-500">Loading settings...</div>;

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Store Settings</h2>
        <p className="text-gray-500 mt-1">Configure your Google Review link and basic store details.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            placeholder="Store Location Address"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
          ></textarea>
        </div>

        <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-xl">
          <label className="block text-sm font-bold text-indigo-900 mb-2">Google Review Link (Vital)</label>
          <p className="text-xs text-indigo-800/70 mb-3">Copy this from your Google My Business dashboard. 4 and 5 star ratings will be redirected here.</p>
          <input
            type="url"
            name="googleReviewLink"
            value={formData.googleReviewLink}
            onChange={handleChange}
            placeholder="https://g.page/r/..."
            className="w-full px-4 py-2 bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold shadow-sm transition-all disabled:opacity-50 flex items-center"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
