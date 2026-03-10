import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { superAdminService } from '../../services/api';

const BusinessManagement = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBusinesses = async () => {
    try {
      const data = await superAdminService.getBusinesses();
      setBusinesses(data);
    } catch (error) {
      console.error('Failed to fetch businesses', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Warning: This will delete the business and all its users. Proceed?')) {
      try {
        await superAdminService.deleteBusiness(id);
        alert('Business deleted successfully');
        fetchBusinesses();
      } catch (error) {
        console.error('Delete failed', error);
        alert('Failed to delete business');
      }
    }
  };

  const handleEdit = async (id, currentName) => {
    const newName = window.prompt('Enter new name for this business:', currentName);
    if (newName && newName !== currentName) {
      try {
        await superAdminService.updateBusiness(id, { name: newName });
        alert('Business updated successfully');
        fetchBusinesses();
      } catch (error) {
        console.error('Update failed', error);
        alert('Failed to update business');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Business Management</h2>
        <Link to="/superadmin/businesses/add" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium shadow-sm transition-colors">
          + Add Business
        </Link>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center py-4 text-gray-500">Loading businesses...</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {businesses.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">No businesses found. Add one to get started.</td>
                </tr>
              ) : (
                businesses.map((biz) => (
                  <tr key={biz._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{biz.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{biz.ownerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{biz.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{biz.plan}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${biz.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {biz.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleEdit(biz._id, biz.name)} className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                      <button onClick={() => handleDelete(biz._id)} className="text-red-600 hover:text-red-900">Remove</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BusinessManagement;
