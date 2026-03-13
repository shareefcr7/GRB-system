import React, { useState } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';

// Import Pages
import Overview from './Overview';
import Reviews from './Reviews';
import QRManager from './QRManager';
import Billing from './Billing';
import Settings from './Settings';

const BusinessDashboard = () => {
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
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-800/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between lg:justify-center">
          <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 tracking-tight">
            GRB Panel
          </h2>
          <button onClick={closeMobileMenu} className="lg:hidden text-gray-500 hover:text-gray-700 p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <nav className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto">
          <NavLink to="/admin" end onClick={closeMobileMenu} className={({ isActive }) => `block py-2.5 px-4 rounded-lg font-medium transition-colors ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>Overview</NavLink>
          <NavLink to="/admin/reviews" onClick={closeMobileMenu} className={({ isActive }) => `block py-2.5 px-4 rounded-lg font-medium transition-colors ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>Reviews</NavLink>
          <NavLink to="/admin/qr-manager" onClick={closeMobileMenu} className={({ isActive }) => `block py-2.5 px-4 rounded-lg font-medium transition-colors ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>QR Code</NavLink>
          <NavLink to="/admin/billing" onClick={closeMobileMenu} className={({ isActive }) => `block py-2.5 px-4 rounded-lg font-medium transition-colors ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>Billing</NavLink>
          <NavLink to="/admin/settings" onClick={closeMobileMenu} className={({ isActive }) => `block py-2.5 px-4 rounded-lg font-medium transition-colors ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>Settings</NavLink>
        </nav>
        <div className="p-4 border-t border-gray-100 mt-auto">
          <button onClick={handleLogout} className="w-full text-left py-2 px-4 rounded text-red-600 font-medium hover:bg-red-50 transition-colors">
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-8 shadow-sm z-10 w-full">
          <div className="flex items-center">
            <button onClick={() => setIsMobileMenuOpen(true)} className="mr-3 lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none p-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800 tracking-tight truncate">
              {location.pathname === '/admin' && 'Dashboard Overview'}
              {location.pathname === '/admin/reviews' && 'Reviews & Feedback'}
              {location.pathname === '/admin/qr-manager' && 'QR Code Management'}
              {location.pathname === '/admin/billing' && 'Billing & Plans'}
              {location.pathname === '/admin/settings' && 'Account Settings'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <span className="sr-only">Notifications</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="h-9 w-9 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 text-white flex items-center justify-center font-bold shadow-sm">
                B
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">Business Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50/50 p-4 sm:p-8">
          <div className="max-w-7xl mx-auto h-full">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/qr-manager" element={<QRManager />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BusinessDashboard;
