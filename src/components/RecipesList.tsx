import { regularMealPlan } from '../data/regularMealPlan';
import { twentyTwoDayPlan } from '../data/twentyTwoDayPlan';

interface RecipesListProps {
  onSelectPlan: (planType: '22-day' | 'regular') => void;
}

export const RecipesList = ({ onSelectPlan }: RecipesListProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Choose Your Meal Plan</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Regular Plan */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{regularMealPlan.name}</h2>
            <p className="text-gray-600 mb-4">{regularMealPlan.description}</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                12 weeks of planned meals
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Daily recipes and shopping lists
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Nutritionally balanced meals
              </li>
            </ul>
            <button
              onClick={() => onSelectPlan('regular')}
              className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
            >
              View 12-Week Plan
            </button>
          </div>
        </div>

        {/* 22-Day Plan */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{twentyTwoDayPlan.name}</h2>
            <p className="text-gray-600 mb-4">{twentyTwoDayPlan.description}</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                22-day comprehensive meal plan
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Weekly shopping lists
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Progress tracking
              </li>
            </ul>
            <button
              onClick={() => onSelectPlan('22-day')}
              className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
            >
              View 22-Day Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
