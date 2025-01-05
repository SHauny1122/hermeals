import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { mealPlanService } from '../services/mealPlanService';

interface ProtectedSmoothiesProps {
  children: React.ReactNode;
}

const ProtectedSmoothies = ({ children }: ProtectedSmoothiesProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        navigate('/login', { state: { from: '/smoothies' } });
        return;
      }

      try {
        const userPlan = await mealPlanService.getUserMealPlan(user.uid);
        setHasAccess(userPlan !== null);
      } catch (error) {
        console.error('Error checking smoothie access:', error);
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
            Unlock Our Smoothie Collection
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our delicious smoothie recipes are included for free with any meal plan purchase!
          </p>
          <button
            onClick={() => navigate('/plans')}
            className="bg-emerald-600 text-white px-8 py-3 rounded-md hover:bg-emerald-700 transition-colors"
          >
            View Meal Plans
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedSmoothies;
