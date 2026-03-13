import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import BusinessDashboard from './pages/business/BusinessDashboard';
import ReviewScanner from './pages/scanner/ReviewScanner';
import InternalFeedback from './pages/scanner/InternalFeedback';
import ThankYou from './pages/scanner/ThankYou';

const PrivateRoute = ({ children, allowedRoles }) => {
  const userString = localStorage.getItem('user');

  if (!userString) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userString);
    if (!user || !user.token) {
      return <Navigate to="/login" replace />;
    }

    // Optional role-based checking
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/login" replace />; // Or to a 'Not Authorized' page
    }

    return children;
  } catch (e) {
    return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Core Scanner Logic Routes */}
            <Route path="/r/:businessId" element={<ReviewScanner />} />
            <Route path="/feedback/:businessId" element={<InternalFeedback />} />
            <Route path="/thank-you" element={<ThankYou />} />

            {/* Protected Routes */}
            <Route
              path="/superadmin/*"
              element={
                <PrivateRoute allowedRoles={['SuperAdmin']}>
                  <SuperAdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <PrivateRoute allowedRoles={['BusinessAdmin', 'SuperAdmin']}>
                  <BusinessDashboard />
                </PrivateRoute>
              }
            />

            {/* Redirect / to login for now */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
