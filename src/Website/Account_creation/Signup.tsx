import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signUp, type SignUpCredentials } from '../../mocks/api';
import Toast from '../Application/pages/Toast';
import Modal from '../Application/pages/Modal';
import DeviceSelectionModal from '../Application/components/DeviceSelectionModal';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpCredentials & { confirmPassword: string }>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeviceModal, setShowDeviceModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/[<>{}]/g, ''); // Basic XSS prevention
    setFormData({ ...formData, [name]: sanitizedValue });
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setShowToast({ message: 'Passwords do not match.', type: 'error' });
      return;
    }
    if (!formData.name || !formData.email || !formData.password || !formData.mobile) {
      setError('All fields are required.');
      setShowToast({ message: 'All fields are required.', type: 'error' });
      return;
    }
    try {
      setLoading(true);
      setError(null);
      await signUp({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        mobile: formData.mobile,
      });
      setShowToast({ message: 'Signup successful! Please confirm to continue.', type: 'success' });
      setShowConfirmModal(true);
    } catch (err: any) {
      const message = err.message || 'Failed to create account. Please try again.';
      setError(message);
      setShowToast({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [formData]);

  const handleConfirm = () => {
    setShowConfirmModal(false);
    setShowDeviceModal(true);
  };

  const handleDeviceModalClose = () => {
    setShowDeviceModal(false);
    navigate('/dashboard', { state: { firstLogin: true } });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Image with Overlay */}
      <div className="hidden md:flex w-1/2 relative h-screen">
        <img
          src="src/assets/Stepper.jpg"
          alt="Signup Background"
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.src = 'src/assets/active_2.jpg')}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center px-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Let's get your steps counted!</h2>
            <p className="text-lg">Join the One Million Steps Challenge today!</p>
          </motion.div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="flex-1 bg-white flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="text-right text-sm font-semibold text-blue-600 mb-4">
          <a href="/signin" className="hover:underline hover:text-blue-700 transition-colors">
            Sign In
          </a>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-blue-600 mb-8"
        >
          One Million Steps
        </motion.h1>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-600 text-center bg-red-50 p-2 rounded-md mb-4"
            role="alert"
          >
            {error}
          </motion.p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm text-gray-600 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-label="Name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              aria-label="Email address"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              aria-label="Password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              aria-label="Confirm password"
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm text-gray-600 mb-1">
              Mobile Number
            </label>
            <input
              id="mobile"
              type="tel"
              name="mobile"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleChange}
              required
              aria-label="Mobile number"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#1d4ed8' }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 mt-4 transition-colors disabled:opacity-50"
            aria-label="Sign up"
          >
            {loading ? 'Signing Up...' : 'Sign Up & Start Walking'}
          </motion.button>
        </form>

        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </a>{' '}
            apply.
          </p>
        </div>
      </div>

      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Signup"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Are you ready to join the One Million Steps Challenge?
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleConfirm}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Confirm signup"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowConfirmModal(false)}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Cancel signup"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <DeviceSelectionModal
        isOpen={showDeviceModal}
        onClose={handleDeviceModalClose}
      />

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

export default Signup;