import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';

interface DeviceConnectionSectionProps {
  className?: string;
}

const DeviceConnectionSection: React.FC<DeviceConnectionSectionProps> = ({
  className = '',
}) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => setIsConnecting(false), 2000);
  };

  return (
    <section
      ref={ref}
      className={`py-16 sm:py-24 bg-white ${className}`}
      id="connect"
      aria-labelledby="device-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-gray-50 rounded-2xl p-8 sm:p-10 md:flex md:items-center md:space-x-10 shadow-md hover:shadow-xl transition-shadow"
        >
          <motion.div
            className="md:w-1/3 mb-8 md:mb-0 flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.img
              src="src/assets/Watch.png"
              alt="Fitness tracker syncing with StepUp Ghana app"
              className="rounded-xl w-full max-w-xs shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              loading="lazy"
            />
          </motion.div>

          <motion.div
            className="md:w-2/3"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2
              id="device-heading"
              className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 tracking-tight"
            >
              Connect Your Device
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Link your fitness tracker or smartphone to automatically sync your steps and track your progress in our challenges.
            </p>
            <motion.button
              onClick={handleConnect}
              disabled={isConnecting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-lg shadow-md transition-all flex items-center ${
                isConnecting ? 'opacity-75' : ''
              }`}
              aria-label={isConnecting ? 'Connecting device...' : 'Connect your fitness device'}
            >
              {isConnecting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Connecting...
                </>
              ) : (
                'Connect Now'
              )}
            </motion.button>

            <div className="mt-8">
              <p className="text-sm text-gray-500 mb-3">Works with:</p>
              <div className="flex flex-wrap gap-3">
                {['Apple Watch', 'Fitbit', 'Garmin', 'Samsung Health'].map((device) => (
                  <motion.span
                    key={device}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-700 border border-gray-200 hover:bg-gray-100 transition cursor-pointer"
                  >
                    {device}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DeviceConnectionSection;
