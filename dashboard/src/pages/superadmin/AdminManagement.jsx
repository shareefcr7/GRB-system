import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { superAdminService } from '../../services/api';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdmins = async () => {
    try {
      const data = await superAdminService.getAdmins();
      setAdmins(data);
    } catch (error) {
      console.error('Failed to fetch admin users', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to completely remove this admin?')) {
      try {
        await superAdminService.deleteAdmin(id);
        alert('Admin removed');
        fetchAdmins();
      } catch (error) {
        console.error('Delete failed', error);
        alert('Failed to delete admin');
      }
    }
  };

  const handleEdit = async (id, currentName) => {
    const newName = window.prompt('Enter new name for this admin:', currentName);
    if (newName && newName !== currentName) {
      try {
        await superAdminService.updateAdmin(id, { name: newName });
        alert('Admin updated securely');
        fetchAdmins();
      } catch (error) {
        console.error('Update failed', error);
        alert('Failed to update admin');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Admin Management</h2>
        <Link to="/superadmin/admins/add" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium shadow-sm transition-colors">
          + Add Admin
        </Link>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center py-4 text-gray-500">Loading admins...</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admins.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">No admins found.</td>
                </tr>
              ) : (
                admins.map((admin) => (
                  <tr key={admin._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{admin.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(admin.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleEdit(admin._id, admin.name)} className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                      <button onClick={() => handleDelete(admin._id)} className="text-red-600 hover:text-red-900">Remove</button>
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

export default AdminManagement;
