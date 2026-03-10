import React from 'react';
import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';

// Import Pages
import Overview from './Overview';
import BusinessManagement from './BusinessManagement';
import AdminManagement from './AdminManagement';
import SubscriptionManagement from './SubscriptionManagement';
import GlobalAnalytics from './GlobalAnalytics';
import SystemSettings from './SystemSettings';
import AddBusiness from './AddBusiness';
import AddAdmin from './AddAdmin';

const SuperAdminDashboard = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 tracking-tight">
            GRB Admin
          </h2>
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">SuperAdmin Portal</span>
        </div>
        <nav className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto">
          <NavLink to="/superadmin" end className={({ isActive }) => `block py-2.5 px-4 rounded-lg transition-colors font-medium ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>Dashboard Overview</NavLink>
          <NavLink to="/superadmin/businesses" className={({ isActive }) => `block py-2.5 px-4 rounded-lg transition-colors font-medium ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>Businesses</NavLink>
          <NavLink to="/superadmin/admins" className={({ isActive }) => `block py-2.5 px-4 rounded-lg transition-colors font-medium ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>Admin Users</NavLink>
          <NavLink to="/superadmin/subscriptions" className={({ isActive }) => `block py-2.5 px-4 rounded-lg transition-colors font-medium ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>Subscriptions</NavLink>
          <NavLink to="/superadmin/analytics" className={({ isActive }) => `block py-2.5 px-4 rounded-lg transition-colors font-medium ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>Global Analytics</NavLink>
          <NavLink to="/superadmin/settings" className={({ isActive }) => `block py-2.5 px-4 rounded-lg transition-colors font-medium ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>System Settings</NavLink>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="w-full flex items-center justify-center py-2 px-4 rounded text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm z-10">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">SuperAdmin Management</h1>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <span className="text-sm font-bold text-gray-800 block">Super Admin</span>
              <span className="text-xs text-indigo-600 font-medium tracking-wide">ROLE: SUPERADMIN</span>
            </div>
            <div className="h-10 w-10 border-2 border-indigo-100 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold shadow-md">
              SA
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/businesses" element={<BusinessManagement />} />
              <Route path="/businesses/add" element={<AddBusiness />} />
              <Route path="/admins" element={<AdminManagement />} />
              <Route path="/admins/add" element={<AddAdmin />} />
              <Route path="/subscriptions" element={<SubscriptionManagement />} />
              <Route path="/analytics" element={<GlobalAnalytics />} />
              <Route path="/settings" element={<SystemSettings />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
