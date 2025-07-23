import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Campaigns = () => {
  const campaigns = [
    {
      img: 'src/assets/active_2.jpg',
      title: 'Step Challenge',
      desc: 'Walk 1 million steps to fight hypertension and raise funds for community health initiatives.',
      stats: ['45,000+ Participants', '186M Steps Taken', '₵2.4M Raised'],
      cta: 'Join Now'
    },
    {
      img: 'src/assets/running.jpg',
      title: 'Run for Health',
      desc: 'Join our annual 5K/10K runs to support diabetes awareness and education programs.',
      stats: ['32 Communities', '12 Rural Clinics', '5,280 Screenings'],
      cta: 'Register'
    },
    {
      img: 'src/assets/active_1.jpg',
      title: 'Community Walks',
      desc: 'Weekly group walks promoting physical activity and health education across Ghana.',
      stats: ['50+ Locations', 'Free Health Checks', 'Expert Guides'],
      cta: 'Find a Walk'
    }
  ];

  return (
    <section id="campaigns" className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full mb-4 uppercase tracking-wider">
            Our Initiatives
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Health Campaigns</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join our movement through these impactful programs that combine fitness with healthcare funding.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden h-60">
                <motion.img 
                  src={campaign.img} 
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  {campaign.title}
                </h3>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-4">{campaign.desc}</p>
                
                <ul className="space-y-2 mb-6">
                  {campaign.stats.map((stat, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{stat}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  to="/signup" 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors group-hover:bg-blue-700"
                >
                  {campaign.cta}
                  <svg className="ml-2 -mr-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Campaigns;