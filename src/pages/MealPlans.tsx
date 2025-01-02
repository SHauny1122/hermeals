import { useState } from 'react';
import { regularMealPlan } from '../data/regularMealPlan';
import { twentyTwoDayPlan } from '../data/twentyTwoDayPlan';
import { RecipesList } from '../components/RecipesList';

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
  const [selectedPlan, setSelectedPlan] = useState<'22-day' | 'regular' | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(1); // Default to week 1

  // If no plan is selected, show the plan selection screen
  if (!selectedPlan) {
    return <RecipesList onSelectPlan={setSelectedPlan} />;
  }

  const currentPlan = selectedPlan === '22-day' ? twentyTwoDayPlan : regularMealPlan;
  const totalWeeks = Math.ceil(currentPlan.meals.length / 7);
  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);

  // Get the meals for the selected week
  const weekStart = ((selectedWeek || 1) - 1) * 7;
  const weekEnd = Math.min(weekStart + 7, currentPlan.meals.length);
  const weekMeals = currentPlan.meals.slice(weekStart, weekEnd);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <button
        onClick={() => {
          setSelectedPlan(null);
          setSelectedWeek(1);
        }}
        className="mb-6 text-emerald-600 hover:text-emerald-700 font-medium flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Meal Plans
      </button>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">{currentPlan.name}</h1>
          <p className="mt-1 text-gray-600">{currentPlan.description}</p>
        </div>

        {/* Week selector buttons */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            {weeks.map((weekNum) => (
              <button
                key={weekNum}
                onClick={() => setSelectedWeek(weekNum)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedWeek === weekNum
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Week {weekNum}
              </button>
            ))}
          </div>
        </div>

        {/* Selected week's meals */}
        <div className="p-6">
          <div className="space-y-8">
            {weekMeals.map((day, dayIndex) => (
              <div key={dayIndex} className="bg-gray-50 rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Day {weekStart + dayIndex + 1}
                </h3>
                
                <div className="space-y-8">
                  {/* Breakfast */}
                  <div>
                    <h4 className="text-emerald-700 font-medium mb-3">Breakfast</h4>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h5 className="font-medium mb-2">{day.breakfast.name}</h5>
                      <RecipeDisplay 
                        recipe={day.breakfast.recipe} 
                        description={day.breakfast.description}
                      />
                    </div>
                  </div>

                  {/* Lunch */}
                  <div>
                    <h4 className="text-emerald-700 font-medium mb-3">Lunch</h4>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h5 className="font-medium mb-2">{day.lunch.name}</h5>
                      <RecipeDisplay 
                        recipe={day.lunch.recipe} 
                        description={day.lunch.description}
                      />
                    </div>
                  </div>

                  {/* Dinner */}
                  <div>
                    <h4 className="text-emerald-700 font-medium mb-3">Dinner</h4>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h5 className="font-medium mb-2">{day.dinner.name}</h5>
                      <RecipeDisplay 
                        recipe={day.dinner.recipe} 
                        description={day.dinner.description}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlans;
