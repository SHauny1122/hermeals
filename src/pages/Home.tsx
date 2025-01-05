// Updated Home page with beautiful UI and animations
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Home = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);

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
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                Welcome to HerMeal
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl">
                Your journey to healthier eating starts here. Discover personalized meal plans designed specifically for women.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  to="/plans"
                  className="inline-block bg-emerald-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-emerald-600 transition-colors duration-150"
                >
                  View Meal Plans
                </Link>
              </motion.div>
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
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, 2, -2, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=1000"
                  alt="Healthy meal preparation"
                  className="w-full h-full object-cover"
                />
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

      {/* Features Section with Flip Animations */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, rotateY: 180 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Meal Plans</h3>
              <p className="text-gray-600">Choose from our carefully crafted meal plans designed specifically for women</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2 
              }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Your Progress</h3>
              <p className="text-gray-600">Monitor your journey and celebrate your achievements</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, rotate: -180 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Balanced Nutrition</h3>
              <p className="text-gray-600">Get the right balance of nutrients with our expertly designed meals</p>
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
                  src="https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2070"
                  alt="Colorful buddha bowl"
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
    </div>
  );
};

export default Home;
