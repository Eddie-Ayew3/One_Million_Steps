import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signIn, signInWithGoogle, signInWithApple, type SignInCredentials } from '../../mocks/api';
import Toast from '../Application/pages/Toast';
import DeviceSelectionModal from '../Application/components/DeviceSelectionModal';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<SignInCredentials>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setShowToast({ message: 'Email and password are required.', type: 'error' });
      return;
    }
    try {
      setLoading(true);
      setError(null);
      await signIn(formData);
      setShowToast({ message: 'Sign-in successful!', type: 'success' });
      setShowModal(true);
    } catch (err: any) {
      const message = err.message || 'Failed to sign in. Please try again.';
      setError(message);
      setShowToast({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [formData]);

  const handleGoogleLogin = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
      setShowToast({ message: 'Signed in with Google!', type: 'success' });
      setShowModal(true);
    } catch (err: any) {
      const message = err.message || 'Google sign-in failed.';
      setError(message);
      setShowToast({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAppleLogin = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithApple();
      setShowToast({ message: 'Signed in with Apple!', type: 'success' });
      setShowModal(true);
    } catch (err: any) {
      const message = err.message || 'Apple sign-in failed.';
      setError(message);
      setShowToast({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/dashboard', { state: { firstLogin: true } });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/[<>{}]/g, ''); // Basic XSS prevention
    setFormData({ ...formData, [name]: sanitizedValue });
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="min-h-screen bg-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-md w-full bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Welcome</h2>
            <p className="text-sm text-gray-600 mb-6">
              Sign in to One Million Steps or{' '}
              <a href="/signup" className="text-blue-600 hover:underline">
                sign up
              </a>{' '}
              to continue.
            </p>
          </motion.div>

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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                required
                aria-label="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                required
                aria-label="Password"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#3b82f6' }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
              aria-label="Sign in"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>

          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="px-3 text-sm text-gray-500">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            aria-label="Sign in with Google"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google logo"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAppleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            aria-label="Sign in with Apple"
          >
            <img
              src="https://www.apple.com/favicon.ico"
              alt="Apple logo"
              className="w-5 h-5 mr-2"
            />
            Continue with Apple
          </motion.button>

          <p className="mt-4 text-center text-xs text-gray-500">
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Terms of Service
            </a>{' '}
            apply.
          </p>
        </motion.div>
      </motion.section>

      <DeviceSelectionModal isOpen={showModal} onClose={handleModalClose} />

      {showToast && (
        <Toast
          message={showToast.message}
          type={showToast.type}
          onClose={() => setShowToast(null)}
        />
      )}
    </>
  );
};

export default SignIn;