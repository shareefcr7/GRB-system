import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { superAdminService } from '../../services/api';

const AddBusiness = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    googleReviewLink: '',
    plan: 'Basic',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await superAdminService.addBusiness(formData);
      alert('Business added successfully! Owner needs to login with password: ' + response.user.temporaryPassword);
      navigate('/superadmin/businesses');
    } catch (error) {
      console.error('Failed to add business', error);
      const errorMsg = error.response?.data?.message || 'Failed to add business';
      alert(errorMsg);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Register New Business</h2>
        <Link to="/superadmin/businesses" className="text-gray-500 hover:text-indigo-600 transition-colors font-medium">
          &larr; Back
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Google Review Link *</label>
            <input
              type="url"
              name="googleReviewLink"
              value={formData.googleReviewLink}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder-gray-400 text-gray-900"
              placeholder="https://g.page/r/YOUR_BUSINESS_ID"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder-gray-400 text-gray-900"
              placeholder="e.g. Cafe Mocha"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Owner Name</label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder-gray-400 text-gray-900"
              placeholder="e.g. John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder-gray-400 text-gray-900"
              placeholder="owner@business.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder-gray-400 text-gray-900"
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Subscription Plan</label>
            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900"
            >
              <option value="Basic">Basic Plan (₹999/mo)</option>
              <option value="Pro">Pro Plan (₹1999/mo)</option>
              <option value="Premium">Premium Plan (₹3499/mo)</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end space-x-4">
          <Link
            to="/superadmin/businesses"
            className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold shadow-md shadow-indigo-200 transition-all"
          >
            Create Business
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBusiness;
