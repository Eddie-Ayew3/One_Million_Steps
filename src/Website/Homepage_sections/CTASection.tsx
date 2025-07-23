import { motion } from 'framer-motion';

const CTASection = () => (
  <section className="relative bg-gradient-to-r from-blue-900 to-green-800 overflow-hidden py-16" id="join">
    {/* Background pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="hidden sm:block absolute inset-y-0 left-0 w-1/3 bg-white/10 backdrop-blur-md transform -skew-x-12" />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold text-white mb-4"
      >
        Ready to Transform Your Health?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
      >
        Join 45,000+ Ghanaians taking control of their health one step at a time.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row justify-center gap-4"
      >
        <button 
          className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          aria-label="Start a walking challenge"
        >
          Start Walking Challenge
        </button>
        <button 
          className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-blue-900 transition-all"
          aria-label="Sponsor a participant"
        >
          Sponsor a Walker
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
        className="mt-10 flex flex-wrap justify-center gap-6"
      >
        {['24/7 Support', 'Free Health Checkups', 'Community Events', 'Corporate Challenges'].map((item) => (
          <motion.div 
            key={item} 
            className="flex items-center text-white text-sm"
            whileHover={{ scale: 1.05 }}
          >
            <svg className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{item}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default CTASection;