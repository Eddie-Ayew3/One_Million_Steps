import { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DocumentTextIcon, UserIcon, MegaphoneIcon, ArrowRightIcon, TrophyIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';

// Type definitions
interface LeaderboardItem {
  rank: number;
  name: string;
  steps: number;
  fund: string;
  avatar?: string;
  progress?: number;
}

interface Institution {
  rank: number;
  name: string;
  totalSteps: number;
  logo?: string;
}

const HealthCampaign = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'individual' | 'institution'>('individual');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      // Enhanced mock data with avatars and progress
      const mockLeaderboardData: LeaderboardItem[] = [
        { rank: 1, name: 'Sarah Mensah', steps: 10543, fund: 'Korle Bu Teaching Hospital', progress: 92 },
        { rank: 2, name: 'Kwame Owusu', steps: 9800, fund: 'Ghana Health Service', progress: 85 },
        { rank: 3, name: 'Ama Serwaa', steps: 9350, fund: 'University of Ghana Hospital', progress: 81 },
        { rank: 4, name: 'Kojo Antwi', steps: 8990, fund: '37 Military Hospital', progress: 78 },
        { rank: 5, name: 'Esi Arthur', steps: 8650, fund: 'Komfo Anokye Teaching Hospital', progress: 75 },
      ];

      const mockInstitutionsData: Institution[] = [
        { rank: 1, name: 'Korle Bu Teaching Hospital', totalSteps: 40125 },
        { rank: 2, name: 'Ghana Health Service', totalSteps: 35670 },
        { rank: 3, name: 'Komfo Anokye Teaching Hospital', totalSteps: 32200 },
        { rank: 4, name: '37 Military Hospital', totalSteps: 29850 },
        { rank: 5, name: 'University of Ghana Hospital', totalSteps: 27430 },
      ];

      // Simulate API loading delay
      setTimeout(() => {
        setLeaderboard(mockLeaderboardData);
        setInstitutions(mockInstitutionsData);
        setIsLoading(false);
      }, 1200);
    } catch (err) {
      console.error('Error fetching mock data:', err);
      setError('Failed to load data. Please try again later.');
      setIsLoading(false);
    }
  }, []);

  const hypertensionStats = [
    { value: '96%', label: 'Leading cause of premature death' },
    { value: '42%', label: '1 in 3 adults are hypertensive' },
    { value: '84%', label: 'Undetected until complications' },
    { value: '35%', label: 'Walking reduces risk by 35%' },
  ];

  const processSteps = [
    {
      title: 'Sign Up & Commit',
      description: 'Join the current NGO-led campaign and set your target steps.',
      icon: <DocumentTextIcon className="w-8 h-8 text-blue-600" />,
      color: 'from-blue-100 to-blue-50',
    },
    {
      title: 'Walk Daily',
      description: 'Track your steps via phone or wearable (Apple Health or Google Fit).',
      icon: <UserIcon className="w-8 h-8 text-green-600" />,
      color: 'from-green-100 to-green-50',
    },
    {
      title: 'Share & Support',
      description: 'Raise awareness and encourage friends to donate to the cause.',
      icon: <MegaphoneIcon className="w-8 h-8 text-purple-600" />,
      color: 'from-purple-100 to-purple-50',
    },
  ];

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white py-8 shadow-xl"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">One Million Steps Challenge</h1>
            <p className="mt-2 text-blue-100">Fighting Hypertension in Ghana</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/signup" 
              className="flex items-center px-6 py-3 bg-white text-blue-800 font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Join Now <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative py-20 sm:py-24 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-blue-400"></div>
            <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-blue-500"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
                  Step Up Against Hypertension
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl font-semibold text-blue-200 max-w-3xl mx-auto">
                Join Ghana's movement for healthier hearts through walking
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="grid grid-cols-2 gap-6"
              >
                {hypertensionStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md hover:shadow-xl transition-all border border-white/10"
                  >
                    <div className="text-3xl mb-2">{stat.value}</div>
                    <p className="text-lg text-blue-200">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-8 flex flex-col justify-between"
              >
                <div>
                  <blockquote className="text-xl sm:text-2xl italic font-medium text-blue-100 border-l-4 border-blue-300 pl-6 py-4 bg-white/10 rounded-lg">
                    "Every step counts in the fight against hypertension. Join the movement today."
                    <footer className="mt-4 text-lg not-italic font-normal text-blue-200">
                      — Ghana Society of Cardiology
                    </footer>
                  </blockquote>
                  <p className="text-lg text-blue-100 leading-relaxed mt-6">
                    Hypertension affects nearly half of Ghanaian adults. Our walking challenge promotes heart health while raising funds for awareness campaigns and treatment programs.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: '#f8fafc' }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-8 py-3 bg-white text-blue-900 font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                    >
                      Join the Challenge <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </motion.button>
                  </Link>
                  <Link to="/about">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg shadow-md hover:bg-white/10 transition-all duration-300"
                    >
                      Learn More
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Process Steps Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative py-16 sm:py-24 bg-white"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-white to-transparent z-10"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Join thousands of Ghanaians in three simple steps to improve your health while supporting a great cause.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                  className={`bg-gradient-to-br ${step.color} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100`}
                >
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="mb-6 p-4 bg-white rounded-full shadow-md">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600 mb-6">{step.description}</p>
                    </div>
                    <span className="text-2xl font-bold text-gray-400">{index + 1}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <p className="text-4xl md:text-5xl font-bold mb-2">10,000+</p>
                <p className="text-lg text-blue-100">Participants</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <p className="text-4xl md:text-5xl font-bold mb-2">2.5M+</p>
                <p className="text-lg text-blue-100">Steps Taken</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <p className="text-4xl md:text-5xl font-bold mb-2">₵150K+</p>
                <p className="text-lg text-blue-100">Raised</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <p className="text-4xl md:text-5xl font-bold mb-2">50+</p>
                <p className="text-lg text-blue-100">Institutions</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Leaderboard Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 sm:py-24 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
                Challenge Leaderboard
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                See who's leading the way in our step challenges and making the biggest impact.
              </p>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center mb-8"
            >
              <div className="inline-flex bg-white rounded-lg shadow-sm p-1 border border-gray-200">
                <button
                  onClick={() => setActiveTab('individual')}
                  className={`px-6 py-2 rounded-md font-medium text-sm transition-all ${activeTab === 'individual' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <div className="flex items-center">
                    <UserIcon className="w-5 h-5 mr-2" />
                    Individuals
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('institution')}
                  className={`px-6 py-2 rounded-md font-medium text-sm transition-all ${activeTab === 'institution' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <div className="flex items-center">
                    <BuildingLibraryIcon className="w-5 h-5 mr-2" />
                    Institutions
                  </div>
                </button>
              </div>
            </motion.div>

            {isLoading ? (
              <div className="bg-white p-8 rounded-xl shadow-md">
                <LoadingSkeleton />
              </div>
            ) : error ? (
              <div className="text-center bg-white p-8 rounded-xl shadow-md">
                <div className="text-red-600 text-xl py-10">{error}</div>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'individual' ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
                    >
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center">
                          <TrophyIcon className="w-6 h-6 mr-2 text-yellow-500" />
                          Top Individuals
                        </h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Steps</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {leaderboard.map((person) => (
                              <motion.tr
                                key={person.rank}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="hover:bg-blue-50 transition-colors"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${person.rank <= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'} font-bold`}>
                                    {person.rank}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {person.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                                  {person.steps.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div 
                                      className="bg-blue-600 h-2.5 rounded-full" 
                                      style={{ width: `${person.progress}%` }}
                                    ></div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {person.fund}
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
                    >
                      <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 border-b border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center">
                          <BuildingLibraryIcon className="w-6 h-6 mr-2 text-green-600" />
                          Top Institutions
                        </h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Steps</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {institutions.map((inst) => (
                              <motion.tr
                                key={inst.rank}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="hover:bg-green-50 transition-colors"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${inst.rank <= 3 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} font-bold`}>
                                    {inst.rank}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {inst.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                                  {inst.totalSteps.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {Math.floor(inst.totalSteps / 2000)} {/* Mock participant count */}
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </motion.section>
        <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16 sm:py-24 bg-gradient-to-r from-blue-700 to-blue-800 text-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6 text-center md:text-left"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to make a difference?
          </h2>
          <p className="text-xl text-blue-100 max-w-xl">
            Join thousands of Ghanaians walking for better heart health today.
          </p>
          <div>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-800 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
              >
                Start Walking Today
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.img
          src="src/assets/leaderboard.jpg" // Replace with your image path
          alt="Step Challenge"
          className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.section>
      </main>

      {/* Custom Tailwind animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default HealthCampaign;