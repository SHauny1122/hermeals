import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mealPlanService } from '../services/mealPlanService';
import { UserMealPlan } from '../types/mealPlans';

interface RecipeDisplayProps {
  recipe: string;
  description?: string;
}

const RecipeDisplay = ({ recipe, description }: RecipeDisplayProps) => {
  if (!recipe) {
    return <p className="text-gray-600 italic">{description}</p>;
  }

  // Split the recipe into sections
  const sections = recipe.split('\n\n').filter(Boolean);
  
  return (
    <div className="space-y-4">
      {sections.map((section, index) => {
        const lines = section.trim().split('\n');
        const title = lines[0].toLowerCase();
        
        // Format based on section type
        if (title.includes('yield') || title.includes('serves')) {
          return (
            <div key={index} className="space-y-1">
              <h4 className="font-bold text-emerald-800">Yield:</h4>
              <p className="text-gray-700">{lines.join(' ')}</p>
            </div>
          );
        } else if (title.includes('ingredients')) {
          return (
            <div key={index} className="space-y-2">
              <h4 className="font-bold text-emerald-800">Ingredients:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {lines.slice(1).map((ingredient, i) => (
                  <li key={i} className="text-gray-700">{ingredient.trim()}</li>
                ))}
              </ul>
            </div>
          );
        } else if (title.includes('instructions')) {
          return (
            <div key={index} className="space-y-2">
              <h4 className="font-bold text-emerald-800">Instructions:</h4>
              <ol className="list-decimal pl-5 space-y-2">
                {lines.slice(1).map((step, i) => (
                  <li key={i} className="text-gray-700">{step.trim()}</li>
                ))}
              </ol>
            </div>
          );
        } else {
          // For any other sections (description, notes, etc)
          return (
            <div key={index} className="space-y-1">
              <p className="text-gray-700">{section}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

const MealPlans = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userPlan, setUserPlan] = useState<UserMealPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (!user) return;
      
      try {
        const plan = await mealPlanService.getUserMealPlan(user.uid);
        setUserPlan(plan);
      } catch (error) {
        console.error('Error fetching user plan:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPlan();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // If user doesn't have a plan, redirect to plans and pricing
  if (!userPlan) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Active Meal Plan</h2>
          <p className="text-gray-600 mb-8">You haven't purchased a meal plan yet.</p>
          <button
            onClick={() => navigate('/plans')}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            View Plans & Pricing
          </button>
        </div>
      </div>
    );
  }

  // If user has a plan, show their plan
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">{userPlan.mealPlan?.name}</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Your Progress</h3>
          <p className="text-gray-600">Day {userPlan.currentDay + 1} of {userPlan.mealPlan?.meals.length}</p>
        </div>

        <div className="space-y-8">
          {userPlan.mealPlan?.meals.map((day, index) => (
            <div 
              key={index}
              className={`p-6 rounded-lg ${
                index === userPlan.currentDay 
                  ? 'bg-emerald-50 border border-emerald-200'
                  : 'bg-gray-50'
              }`}
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Day {index + 1}
                {index === userPlan.currentDay && (
                  <span className="ml-2 text-emerald-600">(Current Day)</span>
                )}
              </h4>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Breakfast</h5>
                  <RecipeDisplay recipe={day.breakfast.recipe} description={day.breakfast.description} />
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Lunch</h5>
                  <RecipeDisplay recipe={day.lunch.recipe} description={day.lunch.description} />
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Dinner</h5>
                  <RecipeDisplay recipe={day.dinner.recipe} description={day.dinner.description} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPlans;
