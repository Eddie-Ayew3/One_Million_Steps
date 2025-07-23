import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AboutSectionProps {
  className?: string;
}

interface Stat {
  value: string;
  label: string;
}

interface MissionCard {
  icon: string;
  title: string;
  content: string;
  color: string;
  bgColor: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ className = '' }) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats: Stat[] = [
    { value: '45,000+', label: 'Active Participants' },
    { value: '1.2M', label: 'Steps Tracked Daily' },
    { value: '32', label: 'Communities Reached' },
    { value: '₵2.4M', label: 'Health Funds Raised' },
  ];

  const missionCards: MissionCard[] = [
    {
      icon: '🏥',
      title: 'Healthcare Access',
      content: 'Funding mobile clinics and preventive screenings in underserved communities.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: '🏃‍♂️',
      title: 'Community Fitness',
      content: 'Organizing walking groups and fitness challenges across all regions.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: '📚',
      title: 'Health Education',
      content: 'Workshops on nutrition, hypertension prevention, and diabetes management.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <section
      ref={ref}
      className={`py-20 ${className}`}
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full mb-4">
            Our Movement
          </span>
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight"
          >
            More Than Just Steps
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're a non-profit organization dedicated to improving health outcomes in Ghana through innovative fitness and fundraising initiatives.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              whileHover={{ y: -5, transition: { duration: 0.3, ease: 'easeOut' } }}
              className="bg-gray-50 p-6 rounded-xl text-center hover:bg-blue-50 transition-colors duration-300 shadow-md"
              role="listitem"
            >
              <p className="text-3xl sm:text-4xl font-bold text-blue-900 mb-2">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {missionCards.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              whileHover={{ y: -5, transition: { duration: 0.3, ease: 'easeOut' } }}
              className={`group p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ${item.bgColor}`}
              role="listitem"
            >
              <span className={`text-4xl mb-4 ${item.color}`}>{item.icon}</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.content}</p>
              <a
                href="#"
                className={`inline-flex items-center font-medium ${item.color} group-hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${item.color.split('-')[1]}-500`}
                aria-label={`Learn more about ${item.title}`}
              >
                Learn more
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
