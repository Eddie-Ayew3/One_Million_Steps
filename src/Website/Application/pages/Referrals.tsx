import React, { useState, useEffect, useCallback } from 'react';
import { fetchUser } from '../../../mocks/api';
import Toast from './Toast';
import Modal from './Modal';

interface User {
  id: string;
  name: string;
  email: string;
  gender?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    device: '',
  });
  const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchUser();
      setUser(data);
      setFormData({
        name: data.name,
        email: data.email,
        gender: data.gender || '',
        device: '',
      });
      setError(null);
    } catch (err) {
      setError('Failed to load user data.');
      setShowToast({ message: 'Failed to load user data.', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Basic input sanitization
    const sanitizedValue = value.replace(/[<>{}]/g, '');
    setFormData({ ...formData, [name]: sanitizedValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setShowToast({ message: 'Name and email are required.', type: 'error' });
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmUpdate = () => {
    setShowConfirmModal(false);
    setShowToast({ message: 'Profile updated!', type: 'success' });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      {loading && (
        <div className="text-center text-gray-600" role="status">
          Loading profile...
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          {error}
          <button
            onClick={fetchUserData}
            className="ml-4 text-sm text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Retry loading profile"
          >
            Retry
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Email"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Gender"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Step Tracking Device</label>
            <select
              name="device"
              value={formData.device}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Step tracking device"
            >
              <option value="">Select Device</option>
              <option value="Apple HealthKit">Apple HealthKit</option>
              <option value="Google Fit">Google Fit</option>
              <option value="Samsung Health">Samsung Health</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Save profile changes"
          >
            Save Changes
          </button>
        </form>
      </div>

      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Profile Update"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Are you sure you want to update your profile?</p>
          <div className="flex gap-2">
            <button
              onClick={confirmUpdate}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Confirm profile update"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowConfirmModal(false)}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Cancel profile update"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {showToast && (
        <Toast
          message={showToast.message}
          type={showToast.type}
          onClose={() => setShowToast(null)}
        />
      )}
    </div>
  );
};

export default Profile;