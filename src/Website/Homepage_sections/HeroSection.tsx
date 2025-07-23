import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const blurValue = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const brightnessValue = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  const scaleValue = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const yValue = useTransform(scrollYProgress, [0, 0.3], [0, 50]);

  return (
    <section 
      className="relative isolate px-6 pt-32 lg:px-8 overflow-hidden min-h-screen flex items-center"
      ref={sectionRef}
    >
      {/* Hero Background Image */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.img 
          src='src/assets/HeroSection.jpg'
          alt="Happy people walking together"
          className="w-full h-full object-cover"
          style={{
            filter: `blur(${blurValue}px) brightness(${brightnessValue})`,
            transform: `scale(${scaleValue})`
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0.2, 0.5]) }}
        />
      </div>

      {/* Hero Content */}
      <motion.div
        className="mx-auto max-w-7xl w-full py-10 sm:py-20 lg:py-32 text-center"
        style={{
          opacity: opacityValue,
          y: yValue
        }}
      >
        <motion.span
          className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-700 bg-blue-100 rounded-full mb-4 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Step Into Health
        </motion.span>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Take <span className="text-blue-300">1 Million Steps</span> Toward <br />
          Better Health in Ghana
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Join our life-changing walking challenge and be part of the movement to combat hypertension and diabetes in our communities.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <Link to="/signup">
            <motion.button 
              className="px-8 py-4 text-white font-semibold rounded-lg transition-all transform hover:-translate-y-1 hover:scale-105 duration-300 relative overflow-hidden shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 backdrop-blur-sm"></div>
              <span className="relative z-10 flex items-center justify-center">
                Join the Challenge
                <svg
                  className="ml-3 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </motion.button>
          </Link>

          <Link to="/about">
            <motion.button 
              className="px-8 py-4 font-semibold rounded-lg transition-all duration-300 relative overflow-hidden shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm border border-white/30"></div>
              <span className="relative z-10 flex items-center justify-center text-white">
                Learn More
                <svg
                  className="ml-3 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scrolling indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="animate-bounce flex flex-col items-center">
          <p className="text-sm text-blue-100 mb-2">Scroll to explore</p>
          <svg className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;