import React, { useState } from 'react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 tracking-tight">
            GRB Admin
          </h2>
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">SuperAdmin Portal</span>
        </div>
        <nav className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto">
          <NavLink to="/superadmin" end onClick={closeMobileMenu} className={({ isActive }) => `block py-2.5 px-4 rounded-lg transition-colors font-medium ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>Dashboard Overview</NavLink>
          <NavLink to="/superadmin/businesses" onClick={closeMobileMenu} className={({ isActive }) => `block py-2.5 px-4 rounded-lg transition-colors font-medium ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>Businesses</NavLink>
          <NavLink to="/superadmin/admins" onClick={closeMobileMenu} className={({ isActive }) => `block py-2.5 px-4 rounded-lg transition-colors font-medium ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>Admin Users</NavLink>
          <NavLink to="/superadmin/subscriptions" onClick={closeMobileMenu} className={({ isActive }) => `block py-2.5 px-4 rounded-lg transition-colors font-medium ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>Subscriptions</NavLink>
          <NavLink to="/superadmin/analytics" onClick={closeMobileMenu} className={({ isActive }) => `block py-2.5 px-4 rounded-lg transition-colors font-medium ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>Global Analytics</NavLink>
          <NavLink to="/superadmin/settings" onClick={closeMobileMenu} className={({ isActive }) => `block py-2.5 px-4 rounded-lg transition-colors font-medium ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>System Settings</NavLink>
        </nav>
        <div className="p-4 border-t border-gray-800 mt-auto">
          <button onClick={handleLogout} className="w-full flex items-center justify-center py-2 px-4 rounded text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 h-screen">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-8 shadow-sm z-10 w-full">
          <div className="flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="mr-3 lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate max-w-[200px] sm:max-w-none">SuperAdmin</h1>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="text-right hidden sm:block">
              <span className="text-sm font-bold text-gray-800 block">Super Admin</span>
              <span className="text-xs text-indigo-600 font-medium tracking-wide">ROLE: SUPERADMIN</span>
            </div>
            <div className="h-9 w-9 sm:h-10 sm:w-10 border-2 border-indigo-100 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold shadow-md text-sm sm:text-base cursor-pointer">
              SA
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 sm:p-8">
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
