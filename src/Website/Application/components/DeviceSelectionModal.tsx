import { useState, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import Toast from '../pages/Toast';

const DeviceSelectionModal: React.FC<{ isOpen: boolean; onClose: (device?: string) => void }> = ({ isOpen, onClose }) => {
  const [device, setDevice] = useState<string>(localStorage.getItem('selectedDevice') || '');
  const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const devices = ['Apple Watch', 'Samsung Watch', 'Google Fit', 'Other'];

  const handleSubmit = useCallback(() => {
    if (!device) {
      setShowToast({ message: 'Please select a device.', type: 'error' });
      return;
    }
    localStorage.setItem('selectedDevice', device);
    setShowToast({ message: `Device ${device} selected successfully!`, type: 'success' });
    setTimeout(() => {
      onClose(device);
      setShowToast(null);
    }, 2000);
  }, [device, onClose]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => onClose()} className="relative z-50">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        {/* Modal content */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full">
              <Dialog.Title className="text-lg font-semibold">Select Tracking Device</Dialog.Title>
              <label htmlFor="device-select" className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                Choose your tracking device:
              </label>
              <select
                id="device-select"
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                className="w-full p-2 border rounded"
                aria-label="Select tracking device"
              >
                <option value="">Select a device</option>
                {devices.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={!device}
                aria-label="Save selected device"
              >
                Save
              </motion.button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
      {showToast && (
        <Toast
          message={showToast.message}
          type={showToast.type}
          onClose={() => setShowToast(null)}
        />
      )}
    </Transition>
  );
};

export default DeviceSelectionModal;