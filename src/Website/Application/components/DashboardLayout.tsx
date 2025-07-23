import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Siderbar';

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 sm:p-6 bg-blue-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;