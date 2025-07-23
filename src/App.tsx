import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Signup from './Website/Account_creation/Signup';
import SignIn from './Website/Account_creation/Signin';
import MainPage from './Website/Mainpage';
import DashboardLayout from '../src/Website/Application/components/DashboardLayout';
import Dashboard from '../src/Website/Application/pages/Dashboard';
import Campaigns from '../src/Website/Application/pages/Campaigns';
import Referrals from '../src/Website/Application/pages/Referrals';
import Donations from '../src/Website/Application/pages/Donations';
import './index.css';

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('selectedDevice'); // Simple auth check
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />

          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="campaigns" element={<Campaigns />} />
              <Route path="referrals" element={<Referrals />} />
              <Route path="donations" element={<Donations />} />
            </Route>
          </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;