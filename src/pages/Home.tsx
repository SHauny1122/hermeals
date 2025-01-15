// Updated Home page with beautiful UI and animations
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import FAQ from '../components/FAQ';
import { contactService } from '../services/contactService';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const ref = useRef(null);
  const { user } = useAuth();
  const [hasPlan, setHasPlan] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Add login prompt modal
  const LoginPrompt = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 ${showLoginPrompt ? 'flex' : 'hidden'} items-center justify-center z-50`}>
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">Login Required</h3>
        <p className="text-gray-600 mb-4">Please log in to access this feature.</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowLoginPrompt(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <Link
            to="/login"
            className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
            onClick={() => setShowLoginPrompt(false)}
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );

  // Check user plan on mount
  useEffect(() => {
    if (user) {
      // Here you would typically check the user's plan status
      // For now, we'll just set it to true if user is logged in
      setHasPlan(true);
    } else {
      setHasPlan(false);
    }
  }, [user]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);

  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactMessage) return;

    setIsSubmitting(true);
    try {
      await contactService.submitMessage(contactEmail, contactMessage);
      setContactEmail('');
      setContactMessage('');
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" ref={ref}>
      {/* Hero Section with Floating Image and Parallax */}
      <div className="relative bg-gradient-to-r from-emerald-50 to-teal-50 py-20 overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{ y: backgroundY }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,190,160,0.1),rgba(0,163,255,0))]" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Text Content with Spring Animation */}
            <motion.div 
              className="flex-1 text-center md:text-left"
              initial={{ opacity: 0, rotateX: 90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 1 
              }}
              style={{ y: textY }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
                Transform Your Health Journey
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Meal Plans Designed for Your <span className="text-emerald-600">Hormonal Health</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                Scientifically crafted meal plans that work with your body's natural rhythms to enhance your well-being.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/plans"
                    className="inline-block bg-emerald-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-emerald-600 transition-colors w-full sm:w-auto text-center"
                  >
                    View Meal Plans
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/preview"
                    className="inline-block border-2 border-emerald-500 text-emerald-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition-colors w-full sm:w-auto text-center"
                  >
                    See Sample Meals
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Floating Image with Bounce Animation */}
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                bounce: 0.4,
                duration: 1.5 
              }}
              style={{ y: imageY }}
            >
              <motion.div 
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ 
                  scale: 1.02,
                  rotate: [0, 1, -1, 0],
                  transition: { duration: 0.3 }
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=1000"
                  alt="Healthy meal preparation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent"></div>
              </motion.div>
              
              {/* Floating Achievement Cards */}
              <motion.div 
                className="absolute -right-4 top-4 bg-white rounded-lg shadow-xl p-3 w-40"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">1000+</p>
                    <p className="text-xs text-gray-600">Happy Members</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -left-4 bottom-4 bg-white rounded-lg shadow-xl p-3 w-40"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">200+</p>
                    <p className="text-xs text-gray-600">Unique Recipes</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-100 rounded-full opacity-20"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-teal-100 rounded-full opacity-20"></div>
        </div>
      </div>

      {/* 24/7 Support Banner with Dropdown */}
      <div className="bg-indigo-600 py-4 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-3">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" 
              />
            </svg>
            <motion.span 
              className="text-white font-medium hidden md:inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              24/7 Support Available For All Members
            </motion.span>
            <div className="relative group">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-600 px-4 py-1 rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors"
                onClick={() => !user && setShowLoginPrompt(true)}
              >
                Contact Support
              </motion.button>
              {/* Dropdown Contact Options - Only show if user has plan */}
              {user && hasPlan ? (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4">
                    <div className="space-y-4">
                      {/* Email Option */}
                      <a 
                        href="mailto:support@hermeal.com"
                        className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 transition-colors"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                          />
                        </svg>
                        <span className="text-sm">Email Support</span>
                      </a>
                      
                      {/* Quick Contact Form */}
                      <form className="space-y-2" onSubmit={handleContactSubmit}>
                        <input
                          type="email"
                          placeholder="Your Email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          required
                          className="w-full px-3 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <textarea
                          placeholder="Your Message"
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          required
                          rows={3}
                          className="w-full px-3 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full px-4 py-1 rounded text-sm font-medium transition-colors ${
                            isSubmitting 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : submitSuccess 
                                ? 'bg-green-600 text-white'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                          }`}
                        >
                          {isSubmitting ? 'Sending...' : submitSuccess ? 'Message Sent!' : 'Send Message'}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ) : (
                /* Show upgrade prompt for non-plan users */
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4">
                    <div className="text-center space-y-3">
                      <p className="text-gray-600 text-sm">
                        {!user 
                          ? "Please log in to access support" 
                          : "Support is available with any meal plan"}
                      </p>
                      <Link
                        to={user ? "/plans" : "/login"}
                        className="block w-full bg-indigo-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-indigo-700 transition-colors"
                      >
                        {user ? "View Plans" : "Log In"}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section with Flip Animations */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
              Our Features
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and support to help you achieve your health goals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, rotateY: 180 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">Personalized Meal Plans</h3>
              <p className="text-gray-600 leading-relaxed">Tailored nutrition plans that adapt to your unique needs and preferences throughout your cycle.</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2 
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">Track Your Progress</h3>
              <p className="text-gray-600 leading-relaxed">Visual insights and progress tracking to keep you motivated on your wellness journey.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, rotate: -180 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">Balanced Nutrition</h3>
              <p className="text-gray-600 leading-relaxed">Expert-crafted meals that provide the perfect balance of nutrients for hormonal health.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Benefits Section with Image Cards */}
      <div className="py-16 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of HerMeal</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our meal plans are specifically designed to work with your body's natural rhythms and hormonal cycles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Hormone Balance Card */}
            <motion.div
              className="group relative overflow-hidden rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070"
                  alt="Balanced breakfast with fruits and nuts"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Hormone Balance</h3>
                  <p className="text-sm opacity-90">
                    Meals designed to support your hormonal cycles and optimize your body's natural rhythm
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Energy & Vitality Card */}
            <motion.div
              className="group relative overflow-hidden rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070"
                  alt="Vibrant healthy meal with quinoa, vegetables, and superfoods"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Energy & Vitality</h3>
                  <p className="text-sm opacity-90">
                    Nutrient-rich meals that boost energy levels and support your active lifestyle
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Wellness Journey Card */}
            <motion.div
              className="group relative overflow-hidden rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src="https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070"
                  alt="Healthy breakfast spread"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Wellness Journey</h3>
                  <p className="text-sm opacity-90">
                    Personalized nutrition that adapts to your body's changing needs
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Benefits Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Why Choose Hormone-Optimized Meal Plans?
              </h3>
              <p className="text-gray-600 mb-6">
                Your hormones influence everything from your metabolism and energy levels to your mood and sleep patterns. 
                Our meal plans are scientifically designed to support your hormonal health throughout your cycle.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-emerald-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-600">Supports natural hormone balance</p>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-emerald-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-600">Optimizes energy throughout your cycle</p>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-emerald-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-600">Reduces cravings and mood swings</p>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-emerald-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-600">Enhances overall well-being</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Follow Us Section with Bounce Animation */}
      <motion.div 
        className="bg-emerald-50 py-16"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring",
          bounce: 0.4,
          duration: 1 
        }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-xl text-gray-600 mb-8">
            Follow us on social media for daily inspiration, healthy recipes, and wellness tips
          </p>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/30 to-white" />
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-100/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/2 w-96 h-96 rounded-full bg-emerald-100/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center mb-16">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-emerald-600">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Hear from our happy members
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-xl ring-1 ring-gray-900/5"
            >
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-100/30 rounded-full blur-2xl" />
              <blockquote>
                <p className="text-base text-gray-900">
                  "The meal plans are amazing, but what really surprised me was the fitness calendar! It's perfect for busy days when I can't make it to the gym. Love how everything works together."
                </p>
                <div className="mt-6 flex items-center gap-x-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                    <span className="font-semibold text-white">SJ</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Johnson</div>
                    <div className="text-gray-600">Working Mom, Age 34</div>
                  </div>
                </div>
              </blockquote>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-xl ring-1 ring-gray-900/5"
            >
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-100/30 rounded-full blur-2xl" />
              <blockquote>
                <p className="text-base text-gray-900">
                  "I've tried other meal planning services, but HerMeal really understands what women need. The recipes are delicious, and I love how I can customize everything to my preferences."
                </p>
                <div className="mt-6 flex items-center gap-x-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                    <span className="font-semibold text-white">EM</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Emily Martinez</div>
                    <div className="text-gray-600">Fitness Enthusiast, Age 28</div>
                  </div>
                </div>
              </blockquote>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-xl ring-1 ring-gray-900/5"
            >
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-100/30 rounded-full blur-2xl" />
              <blockquote>
                <p className="text-base text-gray-900">
                  "The smoothie recipes are perfect, and whenever I have questions, the customer support team responds within minutes! They're so helpful and friendly. It feels like having a personal nutrition coach."
                </p>
                <div className="mt-6 flex items-center gap-x-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                    <span className="font-semibold text-white">LT</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Lisa Thompson</div>
                    <div className="text-gray-600">Teacher, Age 31</div>
                  </div>
                </div>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Login Prompt */}
      <LoginPrompt />
    </div>
  );
};

export default Home;
