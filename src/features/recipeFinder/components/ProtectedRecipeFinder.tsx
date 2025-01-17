import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { mealPlanService } from '../../../services/mealPlanService';

interface ProtectedRecipeFinderProps {
  children: React.ReactNode;
}

const ProtectedRecipeFinder = ({ children }: ProtectedRecipeFinderProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        navigate('/login', { state: { from: '/recipe-finder' } });
        return;
      }

      try {
        const userPlan = await mealPlanService.getUserMealPlan(user.uid);
        setHasAccess(userPlan !== null);
      } catch (error) {
        console.error('Error checking recipe finder access:', error);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-emerald-50 to-teal-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Turn Your Ingredients into Delicious Meals
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Our AI-powered Recipe Finder helps you discover perfect recipes based on the ingredients you have. No more food waste, no more recipe hunting!
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-emerald-600 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Snap a Photo</h3>
              <p className="text-gray-600">Simply take a photo of your ingredients, and let our AI do the rest!</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-emerald-600 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Instant Recipes</h3>
              <p className="text-gray-600">Our AI instantly identifies ingredients and suggests perfect recipe matches.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-emerald-600 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Time & Money</h3>
              <p className="text-gray-600">Reduce food waste and discover new recipes with ingredients you already have.</p>
            </div>
          </div>

          {/* Price Inclusion Notice */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-12 text-center">
            <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Included in All Plans
            </div>
            <h3 className="text-2xl font-bold mb-4">Get Complete Access for Just $19.99</h3>
            <p className="text-gray-600 mb-6">
              The Recipe Finder is included in our complete package along with meal plans, smoothie recipes, and fitness guides!
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={() => navigate('/pricing')}
              className="w-full sm:w-auto px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              View Pricing
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg border-2 border-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              Sign In
            </button>
          </div>
          
          {/* Sign Up Link */}
          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-emerald-600 font-semibold hover:text-emerald-700"
            >
              Sign up now
            </button>
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRecipeFinder;
