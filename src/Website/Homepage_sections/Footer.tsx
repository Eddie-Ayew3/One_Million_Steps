import { memo } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

interface FooterProps {
  className?: string;
}

interface FooterLinkGroup {
  title: string;
  items: string[];
}

const SocialIcon = memo(
  ({ Icon, index }: { Icon: React.ElementType; index: number }) => (
    <a
      href="#"
      className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
      aria-label={`Social media link ${index + 1}`}
    >
      <Icon className="text-lg" />
    </a>
  )
);
SocialIcon.displayName = 'SocialIcon';

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const linkGroups: FooterLinkGroup[] = [
    {
      title: 'Quick Links',
      items: ['Home', 'Challenges', 'Leaderboard', 'Impact Stories', 'About'],
    },
    {
      title: 'Resources',
      items: ['How It Works', 'Health Tips', 'Device Guide', 'Partner With Us'],
    },
    {
      title: 'Legal',
      items: ['Terms', 'Privacy', 'Cookie Policy', 'Accessibility'],
    },
  ];

  return (
    <footer
      className={`bg-gray-900 text-gray-300 ${className}`}
      aria-labelledby="footer-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src="src/assets/Logo.png"
                alt="StepUp Ghana"
                className="h-12 mr-3"
              />
            </div>
            <p className="text-sm mb-4 leading-relaxed">
              "Walking for health, stepping for change" – Join our mission to
              combat hypertension and diabetes through community fitness.
            </p>
            <div className="flex space-x-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                (Icon, i) => (
                  <SocialIcon key={i} Icon={Icon} index={i} />
                )
              )}
            </div>
          </div>

          {linkGroups.map(({ title, items }) => (
            <nav key={title} role="navigation" aria-label={title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm hover:text-white transition-colors focus:outline-none focus:underline"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Health Updates
            </h3>
            <p className="text-sm mb-4 leading-relaxed">
              Get monthly health tips and challenge updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                required
                aria-label="Email for newsletter subscription"
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs">
            <p className="mb-4 md:mb-0">
              © 2025 StepUp Ghana. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              {[
                'Health Disclaimer',
                'Transparency Report',
                'Annual Impact',
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-white transition-colors focus:outline-none focus:underline"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
