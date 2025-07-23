import React from 'react';
import { motion } from 'framer-motion';
import Header from './Homepage_sections/Header';
import HeroSection from './Homepage_sections/HeroSection';   
import Campaigns from './Homepage_sections/Campaigns';
import HealthCampaign from './Homepage_sections/HealthCampaign';
import CTASection from './Homepage_sections/CTASection';
import Footer from './Homepage_sections/Footer';
import AboutSection from './Homepage_sections/AboutSection';
import DeviceConnectionSection from './Homepage_sections/Device';
import ImpactTestimonials from './Homepage_sections/ImpactTestimonials';
import LogoCloud from './Homepage_sections/logoCloud';

const MainPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white overflow-x-hidden">
            {/* Smooth scroll container */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header with scroll effects */}
                <Header />

                {/* Hero Section with parallax effects */}
                <HeroSection />

                {/* Animated transition between sections */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    {/* Campaigns Section */}
                    <Campaigns />

                    {/* Health Campaign Leaderboard */}
                    <HealthCampaign/>

                    {/* Impact & Testimonials */}
                    <ImpactTestimonials />

                    {/* Device Connection */}
                    <DeviceConnectionSection />

                    {/* About Section */}
                    <AboutSection />

                    {/* Partner Logos */}
                    <LogoCloud/>

                    {/* Final CTA */}
                    <CTASection />
                </motion.div>

                {/* Footer */}
                <Footer />
            </motion.div>

            {/* Global styles for animations */}
            <style>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                
                /* Smooth scrolling behavior */
                html {
                    scroll-behavior: smooth;
                }
                
                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                ::-webkit-scrollbar-thumb {
                    background: #3b82f6;
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #2563eb;
                }
            `}</style>
        </div>
    );
};

export default MainPage;