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
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Unlock Our Recipe Finder
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get instant access to our Recipe Finder along with meal plans, smoothies, and fitness options
            with our all-inclusive package.
          </p>
          <button
            onClick={() => navigate('/pricing')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            View Pricing
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRecipeFinder;
