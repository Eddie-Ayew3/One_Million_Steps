import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { TrophyIcon } from '@heroicons/react/24/outline';
import { fetchUser, fetchLeaderboard } from '../../../mocks/api';
import DeviceSelectionModal from '../components/DeviceSelectionModal';

interface User {
  id: string;
  name: string;
  email: string;
  gender?: string;
  referralCode: string;
  steps: number;
  donationTotal: number;
  device?: string;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  steps: number;
}

const Dashboard: React.FC = () => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [steps, setSteps] = useState<number>(0);
  const [donation, setDonation] = useState<number>(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const userData = await fetchUser();
      const leaderboardData = await fetchLeaderboard();
      setUser(userData);
      setSteps(userData.steps);
      setDonation(userData.donationTotal);
      setSelectedDevice(userData.device || null);
      setLeaderboard(leaderboardData);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    if (location.state?.firstLogin && !localStorage.getItem('selectedDevice')) {
      setShowDeviceModal(true);
    }
  }, [fetchData, location]);

  const handleDeviceSelect = (device?: string) => {
    if (device) {
      setSelectedDevice(device);
      fetchData(); // Refresh user data to reflect device
    }
    setShowDeviceModal(false);
  };

  const handleDeviceChange = () => {
    setShowDeviceModal(true);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="p-6 space-y-6">
      {loading && (
        <div className="text-center text-gray-600" role="status">
          Loading dashboard...
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          {error}
          <button
            onClick={fetchData}
            className="ml-4 text-sm text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Retry loading dashboard"
          >
            Retry
          </button>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">
        Welcome back{user ? `, ${user.name}` : ''}!
      </h1>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Steps Taken</h2>
          <p className="text-3xl font-bold text-blue-600">{steps.toLocaleString()}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Donation Raised (GHS)</h2>
          <p className="text-3xl font-bold text-green-600">GHS {donation.toLocaleString()}</p>
        </div>
      </div>

      {selectedDevice && (
        <div className="bg-white shadow rounded-lg p-6 mt-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Selected Device</h2>
          <p className="text-xl text-gray-900">{selectedDevice}</p>
          <button
            onClick={handleDeviceChange}
            className="mt-2 text-sm text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Change tracking device"
          >
            Change Device
          </button>
        </div>
      )}
      {!selectedDevice && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mt-4" role="alert">
          No device selected. Please select a tracking device to start.
          <button
            onClick={handleDeviceChange}
            className="ml-4 text-sm text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Select tracking device"
          >
            Select Device
          </button>
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <TrophyIcon className="w-6 h-6 text-yellow-500" />
          <h2 className="text-lg font-semibold text-gray-700">Leaderboard</h2>
        </div>
        <ul className="divide-y divide-gray-200">
          {leaderboard.map((user, index) => (
            <li key={user.id} className="py-2 flex justify-between">
              <span>{index + 1}. {user.name}</span>
              <span className="text-blue-600">{user.steps.toLocaleString()} steps</span>
            </li>
          ))}
        </ul>
      </div>

      <DeviceSelectionModal
        isOpen={showDeviceModal}
        onClose={handleDeviceSelect}
      />
    </div>
  );
};

export default Dashboard;