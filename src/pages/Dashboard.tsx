import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { mealPlanService, PlanType } from '../services/mealPlanService';
import { MealPlan, DayMeals, UserMealPlan } from '../types/mealPlans';
import { fitnessService } from '../services/fitnessService';
import { UserFitnessPlan } from '../types/fitness';
import WeightTracker from '../components/WeightTracker';
import { DashboardShoppingList } from '../components/DashboardShoppingList';

export default function Dashboard() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const viewParam = searchParams.get('view') || 'overview';
  const planType = searchParams.get('type') as PlanType || '22-day';
  
  const [userPlan, setUserPlan] = useState<UserMealPlan | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | null>(null);
  const [activeTab, setActiveTab] = useState<'meals' | 'shopping' | 'weight' | 'fitness'>('meals');
  const [fitnessPlan, setFitnessPlan] = useState<UserFitnessPlan | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const [mealPlanData, fitnessPlanData] = await Promise.all([
            mealPlanService.getUserMealPlan(user.uid),
            fitnessService.getUserFitnessPlan(user.uid)
          ]);
          
          setUserPlan(mealPlanData);
          setFitnessPlan(fitnessPlanData);
          
          if (mealPlanData?.hasAllPlans) {
            // Load the requested plan type or default to the selected plan
            const planToLoad = planType || mealPlanData.selectedPlan;
            const loadedPlan = mealPlanService.getMealPlan(planToLoad);
            setMealPlan(loadedPlan);
            
            // Set initial selected day if not set
            if (selectedDay === null) {
              setSelectedDay(mealPlanData.currentDay || 0);
            }
          }
        } catch (error) {
          console.error('Error fetching user plan:', error);
        }
      };
      fetchUserData();
    } else {
      navigate('/login', { state: { from: '/dashboard' } });
    }
  }, [user, planType, navigate, selectedDay]);

  const handleDayChange = async (day: number) => {
    if (!user) return;
    setSelectedDay(day);
    setSelectedMeal(null);
    try {
      await mealPlanService.updateProgress(user.uid, day);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const handleMealClick = (meal: keyof Omit<DayMeals, 'day'>) => {
    setSelectedMeal(meal);
  };

  const renderIngredients = (ingredients?: { name: string; amount: string; unit?: string; notes?: string }[]) => {
    if (!ingredients) return null;
    return ingredients.map((ingredient, idx) => (
      <li key={idx} className="text-gray-600">
        {ingredient.amount} {ingredient.unit || ''} {ingredient.name}
        {ingredient.notes && <span className="text-gray-500 ml-1">({ingredient.notes})</span>}
      </li>
    ));
  };

  const renderInstructions = (instructions?: string[]) => {
    if (!instructions) return null;
    return instructions.map((instruction, idx) => (
      <li key={idx} className="text-gray-600 mb-2">
        {instruction}
      </li>
    ));
  };

  if (!mealPlan && !viewParam) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Dashboard</h1>
        <p className="text-gray-600">No meal plan selected. Visit the meal plans page to choose a plan.</p>
      </div>
    );
  }

  if (viewParam === 'plan' && mealPlan) {
    // Handle Mediterranean Plan separately
    if (mealPlan.type === 'mediterranean') {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            {/* Plan Selection */}
            {userPlan?.hasAllPlans && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Select Plan:</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      const newPlan = mealPlanService.getMealPlan('22-day');
                      setMealPlan(newPlan);
                      setSelectedWeek(1);
                      setSelectedDay(0);
                    }}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    22-Day Challenge
                  </button>
                  <button
                    onClick={() => {
                      const newPlan = mealPlanService.getMealPlan('12-week');
                      setMealPlan(newPlan);
                      setSelectedWeek(1);
                      setSelectedDay(0);
                    }}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    12-Week Plan
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg bg-emerald-600 text-white"
                  >
                    Mediterranean Plan
                  </button>
                </div>
              </div>
            )}

            {/* Mediterranean Plan Content */}
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Mediterranean Diet Plan</h2>
            <div className="space-y-6">
              {mealPlan.meals.map((day, index) => (
                <div key={index} className="p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4">
                    {`${getDayName(index)} (Day ${index + 1})`}
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(day).map(([mealType, meal]) => {
                      if (mealType === 'day') return null;
                      return (
                        <div key={mealType} className="space-y-2">
                          <h4 className="text-lg font-medium capitalize text-emerald-700">{mealType}</h4>
                          <p className="text-gray-800 font-medium">{meal.name}</p>
                          <p className="text-gray-600">{meal.recipe}</p>
                          {meal.ingredients && (
                            <div className="mt-4">
                              <h5 className="font-medium text-gray-700">Ingredients:</h5>
                              <ul className="list-disc pl-5 mt-2">
                                {meal.ingredients.map((ingredient, i) => (
                                  <li key={i} className="text-gray-600">
                                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                                    {ingredient.notes && ` (${ingredient.notes})`}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {meal.instructions && (
                            <div className="mt-4">
                              <h5 className="font-medium text-gray-700">Instructions:</h5>
                              <ol className="list-decimal pl-5 mt-2">
                                {meal.instructions.map((step, i) => (
                                  <li key={i} className="text-gray-600">{step}</li>
                                ))}
                              </ol>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Original code for 12-week and 22-day plans
    const totalWeeks = mealPlan.duration === 22 ? 3 : 12;
    const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);
    
    const startDayIndex = (selectedWeek - 1) * 7;
    const endDayIndex = Math.min(startDayIndex + 7, mealPlan.meals.length);
    const currentWeekMeals = mealPlan.meals.slice(startDayIndex, endDayIndex);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          {/* Plan Selection */}
          {userPlan?.hasAllPlans && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Select Plan:</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    const newPlan = mealPlanService.getMealPlan('22-day');
                    setMealPlan(newPlan);
                    setSelectedWeek(1);
                    setSelectedDay(0);
                  }}
                  className={`px-4 py-2 rounded-lg ${
                    mealPlan.duration === 22 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  22-Day Challenge
                </button>
                <button
                  onClick={() => {
                    const newPlan = mealPlanService.getMealPlan('12-week');
                    setMealPlan(newPlan);
                    setSelectedWeek(1);
                    setSelectedDay(0);
                  }}
                  className={`px-4 py-2 rounded-lg ${
                    mealPlan.duration === 84 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  12-Week Plan
                </button>
                <button
                  onClick={() => {
                    const newPlan = mealPlanService.getMealPlan('mediterranean');
                    setMealPlan(newPlan);
                    setSelectedWeek(1);
                    setSelectedDay(0);
                  }}
                  className={`px-4 py-2 rounded-lg ${
                    mealPlan.type === 'mediterranean'
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  Mediterranean Plan
                </button>
              </div>
            </div>
          )}

          <h2 className="text-2xl font-bold text-emerald-800 mb-4">{mealPlan.name}</h2>
          
          {/* Week Selection */}
          <div className="flex flex-wrap gap-2 mb-6">
            {weeks.map(week => (
              <button
                key={week}
                onClick={() => setSelectedWeek(week)}
                className={`px-4 py-2 rounded-lg ${
                  selectedWeek === week
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Week {week}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Days Grid */}
            <div className="space-y-6">
              {currentWeekMeals?.map((dayMeals, index) => {
                const dayNumber = startDayIndex + index;
                const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                const dayName = dayNames[index % 7];
                
                return (
                  <div 
                    key={dayNumber}
                    className={`p-4 rounded-lg border ${
                      selectedDay === dayNumber 
                        ? 'border-emerald-500 bg-emerald-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <h3 className="font-semibold text-lg text-gray-900 mb-3">
                      {dayName} (Day {dayNumber + 1})
                    </h3>
                    
                    <div className="space-y-4">
                      {(['breakfast', 'lunch', 'dinner'] as const).map((mealType) => (
                        <div 
                          key={mealType}
                          className={`cursor-pointer p-2 rounded ${
                            selectedDay === dayNumber && selectedMeal === mealType
                              ? 'bg-emerald-100'
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => {
                            handleDayChange(dayNumber);
                            setSelectedMeal(mealType);
                          }}
                        >
                          <div className="font-medium text-emerald-700 capitalize">{mealType}</div>
                          <div className="text-sm text-gray-600">{dayMeals[mealType].name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Meal Details */}
            {selectedMeal !== null && selectedDay !== null && (
              <div className="lg:sticky lg:top-4 space-y-6 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                {mealPlan.meals[selectedDay] && mealPlan.meals[selectedDay][selectedMeal] && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-emerald-800">
                      {mealPlan.meals[selectedDay][selectedMeal].name}
                    </h3>
                    
                    {/* Time and Servings Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      {mealPlan.meals[selectedDay][selectedMeal].prepTime && (
                        <div>
                          <span className="font-medium">Prep Time:</span> {mealPlan.meals[selectedDay][selectedMeal].prepTime}
                        </div>
                      )}
                      {mealPlan.meals[selectedDay][selectedMeal].cookTime && (
                        <div>
                          <span className="font-medium">Cook Time:</span> {mealPlan.meals[selectedDay][selectedMeal].cookTime}
                        </div>
                      )}
                      {mealPlan.meals[selectedDay][selectedMeal].servings && (
                        <div>
                          <span className="font-medium">Servings:</span> {mealPlan.meals[selectedDay][selectedMeal].servings}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {mealPlan.meals[selectedDay][selectedMeal].description && (
                      <p className="text-gray-600">{mealPlan.meals[selectedDay][selectedMeal].description}</p>
                    )}

                    {/* Ingredients */}
                    {mealPlan.meals[selectedDay]?.[selectedMeal]?.ingredients && 
                     mealPlan.meals[selectedDay]?.[selectedMeal]?.ingredients?.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xl font-semibold text-emerald-800">Ingredients</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {renderIngredients(mealPlan.meals[selectedDay]?.[selectedMeal]?.ingredients)}
                        </ul>
                      </div>
                    )}

                    {/* Instructions */}
                    {mealPlan.meals[selectedDay]?.[selectedMeal]?.instructions && 
                     mealPlan.meals[selectedDay]?.[selectedMeal]?.instructions?.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xl font-semibold text-emerald-800">Instructions</h4>
                        <ol className="list-decimal pl-5 space-y-2">
                          {renderInstructions(mealPlan.meals[selectedDay]?.[selectedMeal]?.instructions)}
                        </ol>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Your Dashboard</h1>
      
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-end space-y-4 sm:space-y-0">
        <div className="inline-flex rounded-lg overflow-hidden shadow-sm">
          <button
            onClick={() => setActiveTab('meals')}
            className={`flex-1 sm:flex-none px-6 py-3 text-base sm:text-sm font-medium ${
              activeTab === 'meals'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Meal Plan
          </button>
          <button
            onClick={() => setActiveTab('shopping')}
            className={`flex-1 sm:flex-none px-6 py-3 text-base sm:text-sm font-medium ${
              activeTab === 'shopping'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Shopping List
          </button>
          <button
            onClick={() => setActiveTab('weight')}
            className={`flex-1 sm:flex-none px-6 py-3 text-base sm:text-sm font-medium ${
              activeTab === 'weight'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Weight Tracker
          </button>
          <button
            onClick={() => setActiveTab('fitness')}
            className={`flex-1 sm:flex-none px-6 py-3 text-base sm:text-sm font-medium ${
              activeTab === 'fitness'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Fitness
          </button>
        </div>
      </div>

      {activeTab === 'shopping' ? (
        <DashboardShoppingList mealPlan={mealPlan} selectedDay={0} />
      ) : activeTab === 'weight' ? (
        <WeightTracker />
      ) : activeTab === 'fitness' ? (
        fitnessPlan && (
          <div className="space-y-6">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Your Fitness Journey
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Current fitness level: <span className="font-medium text-gray-900">{fitnessPlan.fitnessLevel}</span></p>
                  <p className="mt-1">Day {fitnessPlan.currentDay} of 30</p>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => navigate('/fitness')}
                    className="inline-flex items-center rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-200"
                  >
                    View Workout Calendar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{mealPlan?.name}</h2>
            {mealPlan && <p className="mt-2 text-gray-600">Day {selectedDay + 1} of {mealPlan.meals.length}</p>}
          </div>

          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                disabled={selectedDay === 0}
                onClick={() => handleDayChange(selectedDay as number - 1)}
                className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-base sm:text-sm transition-colors ${
                  selectedDay === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                Previous Day
              </button>
              <button
                disabled={mealPlan && selectedDay === mealPlan.meals.length - 1}
                onClick={() => handleDayChange(selectedDay as number + 1)}
                className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-base sm:text-sm transition-colors ${
                  mealPlan && selectedDay === mealPlan.meals.length - 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                Next Day
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="space-y-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Today's Meals</h3>
              <div className="grid gap-6">
                {mealPlan && Object.entries(mealPlan.meals[selectedDay as number] || {}).map(([mealType, mealData]) => (
                  <div 
                    key={mealType}
                    onClick={() => handleMealClick(mealType as keyof Omit<DayMeals, 'day'>)}
                    className={`p-4 sm:p-6 rounded-lg border transition-all cursor-pointer ${
                      selectedMeal === mealType 
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                    }`}
                  >
                    <h4 className="text-base sm:text-lg font-medium text-emerald-700 capitalize mb-2">{mealType}</h4>
                    <p className="text-gray-700">{mealData.name || ''}</p>
                    
                    {selectedMeal === mealType && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="prose prose-sm sm:prose max-w-none">
                          {mealData.description && (
                            <p className="text-gray-700 mb-4">{mealData.description}</p>
                          )}
                          {mealData.ingredients && mealData.ingredients.length > 0 && (
                            <div className="mb-4">
                              <h5 className="font-medium text-gray-900 mb-2">Ingredients:</h5>
                              <ul className="list-disc pl-5">
                                {renderIngredients(mealData.ingredients)}
                              </ul>
                            </div>
                          )}
                          {mealData.instructions && mealData.instructions.length > 0 && (
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2">Instructions:</h5>
                              <ol className="list-decimal pl-5">
                                {renderInstructions(mealData.instructions)}
                              </ol>
                            </div>
                          )}
                          {mealData.recipe && typeof mealData.recipe === 'string' && (
                            <div className="whitespace-pre-wrap text-gray-700">{mealData.recipe}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function getDayName(dayNumber: number) {
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return dayNames[dayNumber % 7];
}