import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSearchParams } from 'react-router-dom';
import { mealPlanService } from '../services/mealPlanService';
import { MealPlan, UserMealPlan, DayMeals } from '../types/mealPlans';
import { DashboardShoppingList } from '../components/DashboardShoppingList';
import { recipes } from '../data/recipes';
import { weeklyPlans } from '../data/weeklyPlans';

const Dashboard = () => {
  const [userPlan, setUserPlan] = useState<UserMealPlan | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [activeTab, setActiveTab] = useState<'meals' | 'shopping'>('meals');
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedMeal, setSelectedMeal] = useState<keyof DayMeals | null>(null);
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const view = searchParams.get('view');

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (!user) return;
      try {
        const userMealPlan = await mealPlanService.getUserMealPlan(user.uid);
        if (userMealPlan) {
          setUserPlan(userMealPlan);
          const plan = await mealPlanService.getMealPlan(userMealPlan.planId);
          if (plan) {
            setMealPlan(plan);
          }
        }
      } catch (error) {
        console.error('Error fetching user meal plan:', error);
      }
    };
    fetchUserPlan();
  }, [user]);

  const getRecipe = (recipeName: string) => {
    // Look in all recipe categories
    for (const category of Object.values(recipes)) {
      if (typeof category === 'object' && category[recipeName]) {
        return category[recipeName];
      }
    }
    return null;
  };

  const renderMealDetail = (recipeName: string) => {
    const recipe = getRecipe(recipeName);
    if (!recipe) {
      return <div>Recipe not found: {recipeName}</div>;
    }

    const lines = recipe.split('\n');
    const servings = lines.find(l => l.includes('Serves:'))?.trim();
    const prepTime = lines.find(l => l.includes('Prep Time:'))?.trim();
    const cookTime = lines.find(l => l.includes('Cook Time:'))?.trim();
    const totalTime = lines.find(l => l.includes('Total Time:'))?.trim();
    
    const description = lines.find(l => !l.includes('Serves:') && !l.includes('Time:') && l.trim().length > 0)?.trim();
    
    const ingredientsStart = lines.findIndex(l => l.includes('Ingredients'));
    const instructionsStart = lines.findIndex(l => l.includes('Instructions'));
    
    const ingredients = lines
      .slice(ingredientsStart + 1, instructionsStart)
      .filter(l => l.trim().startsWith('•'))
      .map(l => l.trim());
    
    const instructions = lines
      .slice(instructionsStart + 1)
      .filter(l => /^\d+\./.test(l.trim()))
      .map(l => l.trim());

    return (
      <div className="space-y-4">
        <h3 className="font-bold text-xl text-emerald-700">{recipeName}</h3>
        
        {/* Serving and Time Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {servings && (
            <div>
              <span className="font-bold">Yield:</span> {servings.replace('Serves:', '')}
            </div>
          )}
          {prepTime && (
            <div>
              <span className="font-medium">Prep Time:</span> {prepTime.replace('Prep Time:', '')}
            </div>
          )}
          {cookTime && (
            <div>
              <span className="font-medium">Cook Time:</span> {cookTime.replace('Cook Time:', '')}
            </div>
          )}
          {totalTime && (
            <div>
              <span className="font-medium">Total Time:</span> {totalTime.replace('Total Time:', '')}
            </div>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-gray-600 mb-4">{description}</p>
        )}

        {/* Ingredients */}
        <div className="space-y-2">
          <h4 className="font-bold text-emerald-800">Ingredients</h4>
          <ul className="list-disc pl-5 space-y-1">
            {ingredients.map((ingredient, idx) => (
              <li key={idx} className="text-gray-700">{ingredient.replace('•', '').trim()}</li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        {instructions.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-bold text-emerald-800">Instructions</h4>
            <ol className="list-decimal pl-5 space-y-2">
              {instructions.map((instruction, idx) => (
                <li key={idx} className="text-gray-700">{instruction.replace(/^\d+\./, '').trim()}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  };

  const handleDayChange = async (day: number) => {
    if (!user) return;
    setSelectedDay(day);
    setSelectedMeal(null);
    await mealPlanService.updateProgress(user.uid, day);
  };

  const renderDailyMealDetail = () => {
    if (!mealPlan || selectedMeal === null) return null;
    const dayMeals = mealPlan.meals[selectedDay];
    if (!dayMeals) return null;
    const meal = dayMeals[selectedMeal];
    if (!meal) return null;
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{meal.name}</h3>
        <div className="bg-white rounded-lg p-6 whitespace-pre-wrap">
          {meal.recipe}
        </div>
      </div>
    );
  };

  if (!mealPlan && !view) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Dashboard</h1>
        <p className="text-gray-600">No meal plan selected. Visit the meal plans page to choose a plan.</p>
      </div>
    );
  }

  if (view === 'plan') {
    const weeks = Array.from({ length: 12 }, (_, i) => i + 1);
    const currentWeek = weeklyPlans[`week${selectedWeek}`];
    const days = Object.keys(currentWeek);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-emerald-800 mb-4">12-Week Regular Plan</h2>
          
          {/* Week Selection */}
          <div className="flex flex-wrap gap-2 mb-6">
            {weeks.map(week => (
              <button
                key={week}
                onClick={() => setSelectedWeek(week)}
                className={`px-4 py-2 rounded ${
                  selectedWeek === week
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Week {week}
              </button>
            ))}
          </div>

          {/* Days and Meals */}
          <div className="space-y-8">
            {days.map(day => (
              <div key={day} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-emerald-700 mb-6">{day}</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Breakfast */}
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="text-lg font-bold text-emerald-700 mb-4">Breakfast</h4>
                    {renderMealDetail(currentWeek[day].breakfast)}
                  </div>

                  {/* Lunch */}
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="text-lg font-bold text-emerald-700 mb-4">Lunch</h4>
                    {renderMealDetail(currentWeek[day].lunch)}
                  </div>

                  {/* Dinner */}
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="text-lg font-bold text-emerald-700 mb-4">Dinner</h4>
                    {renderMealDetail(currentWeek[day].dinner)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Dashboard</h1>
      
      <div className="mb-6 flex justify-end">
        <div className="inline-flex rounded-lg overflow-hidden">
          <button
            onClick={() => setActiveTab('meals')}
            className={`px-4 py-2 ${
              activeTab === 'meals'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Meal Plan
          </button>
          <button
            onClick={() => setActiveTab('shopping')}
            className={`px-4 py-2 ${
              activeTab === 'shopping'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Shopping List
          </button>
        </div>
      </div>

      {activeTab === 'shopping' ? (
        <DashboardShoppingList mealPlan={mealPlan} selectedDay={0} />
      ) : (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">{mealPlan?.name}</h2>
            {mealPlan && <p className="mt-2 text-gray-600">Day {selectedDay + 1} of {mealPlan.meals.length}</p>}
          </div>

          <div className="p-6 border-b border-gray-200">
            <div className="flex gap-4">
              <button 
                disabled={selectedDay === 0}
                onClick={() => handleDayChange(selectedDay - 1)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedDay === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                Previous Day
              </button>
              <button
                disabled={mealPlan && selectedDay === mealPlan.meals.length - 1}
                onClick={() => handleDayChange(selectedDay + 1)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  mealPlan && selectedDay === mealPlan.meals.length - 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                Next Day
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Today's Meals</h3>
              <div className="grid gap-4">
                {mealPlan && Object.entries(mealPlan.meals[selectedDay] || {}).map(([mealType, mealData]) => (
                  <div 
                    key={mealType}
                    onClick={() => setSelectedMeal(mealType as keyof DayMeals)}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedMeal === mealType 
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                    }`}
                  >
                    <h4 className="font-medium text-emerald-800 capitalize mb-1">{mealType}</h4>
                    <p className="text-gray-700">{mealData.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              {renderDailyMealDetail() ? (
                renderDailyMealDetail()
              ) : (
                <p className="text-gray-500 text-center">Select a meal to view details</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;