// src/pages/Profile.tsx
import React, { useState, useEffect } from 'react';
import { fetchUser } from '../../../mocks/api';
import Toast  from './Toast';

const Profile: React.FC = () => {
  const [user, setUser] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    device: '',
  });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchUser().then((data) => {
      setUser(data);
      setFormData({
        name: data.name,
        email: data.email,
        gender: data.gender || '',
        device: '',
      });
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock API call
    setShowToast(true);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
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
              className="w-full border px-4 py-2 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg text-sm"
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
              className="w-full border px-4 py-2 rounded-lg text-sm"
            >
              <option value="">Select Device</option>
              <option value="Apple HealthKit">Apple HealthKit</option>
              <option value="Google Fit">Google Fit</option>
              <option value="Samsung Health">Samsung Health</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>

      {showToast && (
        <Toast
          message="Profile updated!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Profile;