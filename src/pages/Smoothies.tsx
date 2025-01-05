import { motion } from 'framer-motion';
import { smoothies } from '../data/smoothies';

const Smoothies = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 to-teal-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-gray-900 mb-12"
        >
          Healthy & Delicious Smoothies
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(smoothies).map(([id, smoothie]) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={smoothie.image}
                  alt={smoothie.name}
                  className="object-cover w-full h-64"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {smoothie.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {smoothie.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Ingredients:</h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    {smoothie.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Instructions:</h4>
                  <ol className="list-decimal pl-5 text-gray-600 space-y-1">
                    {smoothie.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500 mt-4 pt-4 border-t">
                  <span>Prep: {smoothie.prepTime}</span>
                  <span>Yield: {smoothie.yield}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Smoothies;
