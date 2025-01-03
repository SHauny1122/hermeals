import { FaInstagram, FaTiktok, FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  // Placeholder links - to be updated later
  const socialLinks = {
    instagram: "#",
    tiktok: "#",
    facebook: "#"
  };

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">Connect with HerMeals</h3>
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

          <div className="text-center text-sm text-gray-500 mt-4">
            <p>© {new Date().getFullYear()} HerMeals. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
