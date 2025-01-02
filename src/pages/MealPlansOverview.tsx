import React from 'react';
import { Link } from 'react-router-dom';

export const MealPlansOverview: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Meal Plans</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* 22-Day Regular Meal Plan Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-emerald-700 mb-2">22-Day Regular Meal Plan</h2>
              <p className="text-gray-600 mb-4">
                A comprehensive 3-week meal plan with detailed shopping lists and daily recipes for breakfast, lunch, and dinner.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Complete shopping lists for each week</li>
                <li>• Detailed recipes and instructions</li>
                <li>• Balanced meals for optimal nutrition</li>
                <li>• 22 days of planned meals</li>
              </ul>
              <Link
                to="/meal-plans/regular"
                className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                View Plan Details
              </Link>
            </div>
          </div>

          {/* 12-Week Smoothie Plan Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-purple-700 mb-2">12-Week Smoothie Plan</h2>
              <p className="text-gray-600 mb-4">
                A transformative 12-week smoothie plan designed to boost your health and energy levels.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Nutritionally balanced smoothie recipes</li>
                <li>• Progressive weekly plans</li>
                <li>• Easy-to-follow instructions</li>
                <li>• 12 weeks of variety</li>
              </ul>
              <Link
                to="/meal-plans/smoothie"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                View Plan Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
