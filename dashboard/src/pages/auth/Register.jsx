import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    googleReviewLink: '',
    adminName: '',
    adminEmail: '',
    adminPassword: '',
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await authService.registerBusiness(formData);
      alert('Business registered successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Registration error', error);
      alert('Failed to register business');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register Business
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Start getting more 5-star reviews
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <input
            type="text"
            required
            placeholder="Business Name"
            className="w-full px-3 py-2 border rounded"
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          />
          <input
            type="text"
            required
            placeholder="Google Review Link"
            className="w-full px-3 py-2 border rounded"
            onChange={(e) => setFormData({ ...formData, googleReviewLink: e.target.value })}
          />
          <input
            type="text"
            required
            placeholder="Admin Name"
            className="w-full px-3 py-2 border rounded"
            onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
          />
          <input
            type="email"
            required
            placeholder="Admin Email"
            className="w-full px-3 py-2 border rounded"
            onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full px-3 py-2 border rounded"
            onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
          />
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
