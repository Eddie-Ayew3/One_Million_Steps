import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, UserGroupIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: <HomeIcon className="w-6 h-6" /> },
  { name: 'Campaign', path: '/dashboard/campaign', icon: <UserGroupIcon className="w-6 h-6" /> },
  { name: 'Referrals', path: '/dashboard/referrals', icon: <UserGroupIcon className="w-6 h-6" /> },
  { name: 'Donations', path: '/dashboard/donations', icon: <UserGroupIcon className="w-6 h-6" /> },
  { name: 'Profile', path: '/dashboard/profile', icon: <UserIcon className="w-6 h-6" /> },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const linkVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <>
      <div className="md:hidden p-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-blue-600 focus:outline-none"
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      <motion.div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:block fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg p-6 z-50`}
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="flex items-center mb-8">
          <h2 className="text-xl font-bold text-gray-900">One Million Steps</h2>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors ${
                  isActive ? 'bg-blue-100 text-blue-600 font-semibold' : ''
                }`
              }
              onClick={() => setIsOpen(false)}
              aria-label={`Navigate to ${item.name}`}
            >
              <motion.div variants={linkVariants} whileHover="hover">
                {item.icon}
              </motion.div>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </motion.div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;