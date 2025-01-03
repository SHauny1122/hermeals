import { FaInstagram, FaTiktok, FaFacebookF, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  // Social media links
  const socialLinks = {
    instagram: "#",
    tiktok: "https://tiktok.com/@hermeal.com",
    facebook: "https://www.facebook.com/share/15SkVRS9G2/"
  };

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">Connect with HerMeal</h3>
            <p className="text-gray-600 mt-1">Follow us for healthy meal inspiration and tips</p>
          </div>
          
          <div className="flex space-x-6">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-emerald-500 transition-colors"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
            <a
              href={socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-emerald-500 transition-colors"
            >
              <FaTiktok className="w-6 h-6" />
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-emerald-500 transition-colors"
            >
              <FaFacebookF className="w-6 h-6" />
            </a>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2 text-gray-600">
              <FaEnvelope className="w-4 h-4" />
              <a href="mailto:support@hermeal.com" className="hover:text-emerald-500 transition-colors">
                support@hermeal.com
              </a>
            </div>
          </div>

          <div className="flex space-x-4 text-sm text-gray-500">
            <Link to="/privacy-policy" className="hover:text-emerald-500 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms-of-service" className="hover:text-emerald-500 transition-colors">
              Terms of Service
            </Link>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p> {new Date().getFullYear()} HerMeal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
