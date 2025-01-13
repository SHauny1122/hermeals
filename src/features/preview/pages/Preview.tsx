import React from 'react';
import { Link } from 'react-router-dom';
import { getAllPreviewRecipes } from '../data/previewRecipes';

export const Preview: React.FC = () => {
  const recipes = getAllPreviewRecipes();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-emerald-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-6">
            Discover Our Delicious & Healthy Recipes
          </h1>
          <p className="text-lg md:text-xl text-emerald-600 max-w-3xl mx-auto mb-8">
            Get a taste of what HerMeal has to offer with these exclusive preview recipes from our complete collection.
          </p>
        </div>
      </div>

      {/* Recipe Preview Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Featured Recipe Previews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 md:h-56">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                  {recipe.calories} cal
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{recipe.name}</h3>
                <p className="text-gray-600 mb-4">{recipe.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {recipe.tags.map((tag) => (
                    <span key={tag} className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>🕒 Prep: {recipe.prepTime}</span>
                  <span>👩‍🍳 Cook: {recipe.cookTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Everything You Get with HerMeal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 - Meal Plans */}
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Meal Plans</h3>
              <p className="text-gray-600">Custom meal plans designed specifically for your nutritional needs and preferences. Fully customizable upon request.</p>
            </div>

            {/* Feature 2 - Recipe Finder */}
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Recipe Finder</h3>
              <p className="text-gray-600">Discover new recipes using ingredients you already have at home with our AI-powered recipe finder.</p>
            </div>

            {/* Feature 3 - Support */}
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Get help anytime with our dedicated customer support team, always ready to assist you.</p>
            </div>

            {/* Feature 4 - Smoothies */}
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Smoothie Recipes</h3>
              <p className="text-gray-600">Access our complete collection of delicious and nutritious smoothie recipes at no extra cost.</p>
            </div>

            {/* Feature 5 - Training Plan */}
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Training Plan</h3>
              <p className="text-gray-600">Get a complementary fitness training plan designed to work perfectly with your meal plan.</p>
            </div>

            {/* Feature 6 - Lifetime Updates */}
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Lifetime Updates</h3>
              <p className="text-gray-600">Enjoy free membership for life with access to all new updates and features as they're released.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-emerald-800 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-emerald-600 mb-8 max-w-2xl mx-auto">
            Join HerMeal today and get access to hundreds of healthy, delicious recipes, personalized meal plans, and more!
          </p>
          <Link
            to="/signup"
            className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};
