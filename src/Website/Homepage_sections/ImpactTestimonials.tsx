import { motion } from 'framer-motion';
import {  } from 'react';

interface Testimonial {
  name: string;
  quote: string;
  image: string;
  role: string;
}

interface ImpactStat {
  label: string;
  value: string;
}

interface ImpactTestimonialsProps {
  className?: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Kwame Boateng',
    quote:
      'StepUp Ghana helped me stay motivated and improve my health. It’s more than an app—it’s a community.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'Participant',
  },
  {
    name: 'Ama Serwaa',
    quote:
      'Through StepUp, I’ve made new friends and become more active. The challenges are fun and rewarding!',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'Health Advocate',
  },
  {
    name: 'Yaw Mensah',
    quote: 'I never knew walking daily could be so impactful. Thank you, StepUp Ghana!',
    image: 'https://randomuser.me/api/portraits/men/85.jpg',
    role: 'Participant',
  },
];

const impactStats: ImpactStat[] = [
  { label: 'Steps Taken', value: '5.2M+' },
  { label: 'Participants Engaged', value: '12,000+' },
  { label: 'People Screened for Hypertension', value: '3,400+' },
  { label: 'Communities Reached', value: '80+' },
];

const initiatives: string[] = [
  'Wellness Screenings',
  'Mental Health Outreach',
  'Nutrition Workshops',
  'School Fitness Programs',
  'Walkathons & Step Challenges',
];

const ImpactTestimonials: React.FC<ImpactTestimonialsProps> = ({ className = '' }) => {

  return (
    <motion.section
      className={`bg-gray-100 py-20 sm:py-28 ${className}`}
      id="impact"
      aria-labelledby="impact-heading"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            id="impact-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight"
          >
            Real Impact, Real Stories
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Hear from participants and see the difference StepUp Ghana is making across the country.
          </p>
        </div>

        {/* Testimonials */}
        <motion.div className="grid md:grid-cols-3 gap-10 mb-20" role="list">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-green-500"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">{testimonial.quote}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}

        {/* Impact Stats */}
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-20" role="list">
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <p className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Initiatives */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            src="src/assets/Impact.jpg"
            alt="Community outreach and health screenings"
            className="rounded-2xl shadow-lg w-full object-cover max-h-[400px]"
            loading="lazy"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          />

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Empowering Health Nationwide
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed text-base">
              From health screenings to school programs, StepUp Ghana works with local leaders to
              improve health outcomes in every corner of the country.
            </p>
            <ul className="space-y-3">
              {initiatives.map((initiative, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  {initiative}
                </li>
              ))}
            </ul>

            <motion.a
              href="#"
              className="inline-block mt-8 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Read Impact Report
            </motion.a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ImpactTestimonials;
